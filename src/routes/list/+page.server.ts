import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';
import { surveySearchSchema } from '$lib/zod/schema';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { Prisma } from '@prisma/client';

export const load: PageServerLoad = async ({ request, locals, url }) => {
	const { user, session } = await locals.auth.validateUser();
	if (!(user && session)) {
		throw redirect(302, '/');
	}

	const formData = url.searchParams;
	const form = await superValidate(formData, surveySearchSchema);

	console.log(formData);
	console.log(form);
	const data = form.data;

	try {
		await prisma.federalSubject.findFirstOrThrow({
			where: { name: data.federalSubject },
		});
	} catch (error) {
		console.error(error);
		let message = 'При поиске возникла ошибка';

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

		setError(form, null, message);
	}

	const surveys = await prisma.survey.findMany({
		where: {
			federalSubject: { name: { equals: data.federalSubject } },
			placingYear: { equals: data.placingYear },
			markerIndex: { contains: data.markerIndex, mode: 'insensitive' },
			markerName: { contains: data.markerName, mode: 'insensitive' },
			workBy: { contains: data.workBy, mode: 'insensitive' },
			createdBy: { contains: data.createdBy, mode: 'insensitive' },
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			federalSubject: true,
		},
	});

	const federalSubjectsRaw = await prisma.federalSubject.findMany();

	const federalSubjects: AutocompleteOption[] = federalSubjectsRaw.map((subject) => ({
		label: subject.name,
		value: subject.code,
	}));

	return { surveys, form, federalSubjects };
};
