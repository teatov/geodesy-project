import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import { IntegrityState, ObservabilityState, OpennessState, PresenceState, ReadabilityState, SignType } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { setErrorMap, surveySchema } from '$lib/zod/schema';
import { writeFileSync } from 'fs';
import Coordinates from 'coordinate-parser';
import { Prisma } from '@prisma/client';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async () => {
	const federalSubjectsRaw = await prisma.federalSubject.findMany();

	const federalSubjects: AutocompleteOption[] = federalSubjectsRaw.map((subject) => ({
		label: subject.name,
		value: subject.code,
	}));

	const form = await superValidate(surveySchema);

	return { form, federalSubjects };
};

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

export const actions: Actions = {
	createRecord: async ({ request, locals }) => {
		// const { user, session } = await locals.auth.validateUser();
		// if (!(user && session)) {
		// 	throw redirect(302, '/');
		// }

		const formData = await request.formData();
		const form = await superValidate(formData, surveySchema);

		console.log(formData);
		console.log(form);
		const data = form.data;

		const centerMarkPhoto = formData.get('centerMarkPhoto') as File;
		const exteriorPhoto = formData.get('exteriorPhoto') as File;

		console.log(centerMarkPhoto);
		console.log(exteriorPhoto);

		if (!centerMarkPhoto.size) {
			setError(form, 'centerMarkPhoto', 'Поле обязательно');
		}

		if (!exteriorPhoto.size) {
			setError(form, 'exteriorPhoto', 'Поле обязательно');
		}

		let surveyId: string;

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

			console.log('TEST 1');

			if (!form.valid) {
				console.log('TEST 1.5');
				return fail(400, { form });
			}

			const coordinates = new Coordinates(data.coordinates);

			console.log('TEST 1.2');

			console.log('TEST 2');

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
				signPresence: data.signPresence as PresenceState,
				monolith1Integrity: data.monolith1Integrity as IntegrityState,
				outerSignIntegrity: data.outerSignIntegrity as IntegrityState,
				orp1Integrity: data.orp1Integrity as IntegrityState,
				orp2Integrity: data.orp2Integrity as IntegrityState,
				monolith2Openness: data.monolith2Openness as OpennessState,
				monoliths3And4Openness: data.monoliths3And4Openness as OpennessState,
				trenchReadability: data.trenchReadability as ReadabilityState,
				centerMarkPhoto: centerMarkPhoto.name,
				exteriorPhoto: exteriorPhoto.name,
				upperMarkBelowGroundHeight: data.upperMarkBelowGroundHeight,
				satelliteObservability: data.satelliteObservability as ObservabilityState,
				extraNotes: data.extraNotes,
				createdBy: data.createdBy,
			};

			console.log('TEST 3');

			const createdSurvey = await prisma.survey.create({
				data: newSurvey,
			});

			console.log('TEST 4');

			writeFileSync(
				`static/surveyPhotos/${centerMarkPhoto.name}`,
				Buffer.from(await centerMarkPhoto.arrayBuffer())
			);

			writeFileSync(
				`static/surveyPhotos/${exteriorPhoto.name}`,
				Buffer.from(await exteriorPhoto.arrayBuffer())
			);

			surveyId = createdSurvey.id;
		} catch (error) {
			console.error(error);

			console.log('TEST 11111');

			let message = 'При создании возникла ошибка';

			if (error instanceof Error) {
				message = error.message;
				setError(form, null, message);
			}

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					message = 'Введите существующий субъект РФ';
					setError(form, 'federalSubject', message);
				}
			}

			switch (data.signMainType) {
				case 'SIGNAL':
					if (!data.signalType) {
						message = 'Выберите тип знака';
						setError(form, 'signalType', message);
					}
					break;
				case 'PYRAMID':
					if (!data.signMaterial) {
						message = 'Выберите материал пирамиды';
						setError(form, 'signMaterial', message);
					}
					if (!data.signSides) {
						message = 'Выберите количество сторон пирамиды';
						setError(form, 'signSides', message);
					}
					break;
				case 'STAND':
					if (!data.signMaterial) {
						message = 'Выберите материал штатива';
						setError(form, 'signMaterial', message);
					}
					if (!data.signSides) {
						message = 'Выберите количество сторон штатива';
						setError(form, 'signSides', message);
					}
					break;
				case 'POST':
					if (!data.postType) {
						message = 'Выберите тип тура';
						setError(form, 'postType', message);
					}
					break;

				default:
					break;
			}

			console.log('TEST 55555');

			return setError(form, null, message);
		}

		throw redirect(302, `/${surveyId}`);
	},
};
