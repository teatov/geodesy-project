import type { PageServerLoad } from '../$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const surveys = await prisma.survey.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			federalSubject: true
		}
	});

	return { surveys };
};
