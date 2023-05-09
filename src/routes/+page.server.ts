import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import { SignType } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { setErrorMap, surveySchema } from '$lib/zod/schema';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';
import Coordinates from 'coordinate-parser';
import { Prisma } from '@prisma/client';

function getSignType(
	signMainType: string,
	signMaterial: string,
	signSides: string,
	signalType: string,
	postType: string
): SignType {
	let type = '';

	const materialAndSides = signMaterial + '_' + signSides;

	switch (signMainType) {
		case 'SIGNAL':
			type = signalType;
			break;
		case 'PYRAMID':
			type = 'PYRAMID_' + materialAndSides;
			break;
		case 'STAND':
			type = 'STAND_' + materialAndSides;
			break;
		case 'POST':
			type = postType;
			break;

		default:
			return SignType.NA;
	}

	return type as unknown as SignType;
}

setErrorMap();

export const load: PageServerLoad = async () => {
	const surveys = await prisma.survey.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	const federalSubjectsRaw = await prisma.federalSubject.findMany();

	const federalSubjects: AutocompleteOption[] = federalSubjectsRaw.map((subject) => ({
		label: subject.name,
		value: subject.code,
	}));

	const form = await superValidate(surveySchema);

	return { form, surveys, federalSubjects };
};

export const actions: Actions = {
	createRecord: async ({ request, locals }) => {
		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, surveySchema);

		console.log(form);
		const data = form.data;

		try {
			const federalSubject = await prisma.federalSubject.findFirstOrThrow({
				where: { name: data.federalSubject },
			});

			const signType = getSignType(
				data.signMainType,
				data.signMaterial,
				data.signSides,
				data.signalType,
				data.postType
			);

			if (!form.valid) {
				return fail(400, { form });
			}

			const coordinates = new Coordinates(data.coordinates);

			const newSurvey = {
				surveyDate: data.surveyDate,
				federalSubject: {
					connect: {
						code: federalSubject.code,
					},
				},
				workBy: data.workBy,
				latitude: coordinates.getLatitude(),
				longitude: coordinates.getLongitude(),
				markerIndex: data.markerIndex,
				markerName: data.markerName,
				placingYear: data.placingYear,
				signType: signType,
				signHeight: data.signHeight,
				centerType: data.centerType,
				altitude: data.altitude,
				trapezes: data.trapezes,
				signPresence: data.signPresence,
				monolith1Integrity: data.monolith1Integrity,
				outerSignIntegrity: data.outerSignIntegrity,
				orp1Integrity: data.orp1Integrity,
				orp2Integrity: data.orp2Integrity,
				monolith2Openness: data.monolith2Openness,
				monoliths3And4Openness: data.monoliths3And4Openness,
				trenchReadability: data.trenchReadability,
				centerMarkPhoto: {
					connect: {
						id: '0',
					},
				},
				exteriorPhoto: {
					connect: {
						id: '0',
					},
				},
				extraPhotos: {
					connect: {
						id: '0',
					},
				},
				upperMarkBelowGroundHeight: data.upperMarkBelowGroundHeight,
				satelliteObservability: data.satelliteObservability,
				extraNotes: data.extraNotes,
				createdBy: data.createdBy,
			};

			await prisma.survey.create({
				data: newSurvey,
			});
		} catch (error) {
			console.error(error);

			let message = 'При создании записи возникла ошибка';

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					message = 'Введите существующий субъект РФ';
					setError(form, 'federalSubject', message);
				}
			}

			switch (data.signMainType) {
				case 'SIGNAL':
					if (!data.signalType) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'signalType', message);
					}
					break;
				case 'PYRAMID':
					if (!data.signMaterial) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'signMaterial', message);
					}
					if (!data.signSides) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'signSides', message);
					}
					break;
				case 'STAND':
					if (!data.signMaterial) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'signMaterial', message);
					}
					if (!data.signSides) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'signSides', message);
					}
					break;
				case 'POST':
					if (!data.postType) {
						message = 'Введите существующий субъект РФ';
						setError(form, 'postType', message);
					}
					break;

				default:
					break;
			}

			return setError(form, null, 'При создании записи возникла ошибка');
		}

		return { status: 201 };
	},
};
