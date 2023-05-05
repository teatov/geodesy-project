import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import {
	SignType,
	PresenceState,
	IntegrityState,
	OpennessState,
	ReadabilityState,
	ObservabilityState,
} from '@prisma/client';
import { fail, redirect, error } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { setErrorMap, surveySchema } from '$lib/zod/schema';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';
import Coordinates from 'coordinate-parser';

setErrorMap();

export const load: PageServerLoad = async () => {
	const surveys = await prisma.survey.findMany();

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
		// console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const data = form.data;

		const federalSubject = await prisma.federalSubject.findFirstOrThrow({
			where: { name: data.federalSubject },
		});

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
			signType: SignType.NA,
			signHeight: data.signHeight,
			centerType: data.centerType,
			altitude: data.altitude,
			trapezes: data.trapezes,
			signPresence: PresenceState.NA,
			monolith1Integrity: IntegrityState.NA,
			outerSignIntegrity: IntegrityState.NA,
			orp1Integrity: IntegrityState.NA,
			orp2Integrity: IntegrityState.NA,
			monolith2Openness: OpennessState.NA,
			monoliths3And4Openness: OpennessState.NA,
			trenchReadability: ReadabilityState.NA,
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
			upperMarkAboveGroundHeight: data.upperMarkAboveGroundHeight,
			satelliteObservability: ObservabilityState.NA,
			extraNotes: data.extraNotes,
			createdBy: data.createdBy,
		};

		try {
			await prisma.survey.create({
				data: newSurvey,
			});
		} catch (error) {
			console.error(error);

			const message = 'При создании записи возникла ошибка';

			return setError(form, null, message);
		}

		return { status: 201 };
	},
};
