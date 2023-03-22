import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const getRecord = async () => {
		const record = await prisma.test.findUnique({
			where: {
				id: Number(params.id),
			},
		});
		if (!record) {
			throw error(404, 'не найдено');
		}
		return record;
	};

	return {
		record: getRecord(),
	};
};

export const actions: Actions = {
	updateRecord: async ({ request, params }) => {
		const { title, text } = Object.fromEntries(await request.formData()) as {
			title: string;
			text: string;
		};

		try {
			await prisma.test.update({
				where: {
					id: Number(params.id),
				},
				data: {
					title,
					text,
				},
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'не вышло' });
		}

		return {
			status: 200,
		};
	},
};
