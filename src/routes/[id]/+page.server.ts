import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user, session } = await locals.auth.validateUser();
	if (!(user && session)) {
		throw redirect(302, '/');
	}

	const record = await prisma.record.findUniqueOrThrow({
		where: {
			id: params.id,
		},
	});

	if (record.authUserId !== user.userId) {
		throw error(403, 'Вы не можете редактировать чужие записи');
	}

	const getRecord = async () => {
		const record = await prisma.record.findUnique({
			where: {
				id: params.id,
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
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.record.update({
				where: {
					id: params.id,
				},
				data: {
					title,
					content,
				},
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'не вышло' });
		}

		throw redirect(303, '/');
	},
};
