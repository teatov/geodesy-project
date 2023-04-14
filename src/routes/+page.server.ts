import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/prisma';
import { fail, redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		records: await prisma.record.findMany(),
	};
};

export const actions: Actions = {
	createRecord: async ({ request, locals }) => {
		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.record.create({
				data: {
					title,
					content,
					authUserId: user.userId,
				},
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

		return { status: 201 };
	},

	deleteRecord: async ({ url, locals }) => {
		const id = url.searchParams.get('id');

		if (!id) {
			return fail(400, { message: 'плохой реквест' });
		}

		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const record = await prisma.record.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		if (record.authUserId !== user.userId) {
			throw error(403, 'Вы не можете удалять чужие записи');
		}

		try {
			await prisma.record.delete({ where: { id: id } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

		return { status: 200 };
	},
};
