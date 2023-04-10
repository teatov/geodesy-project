import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		records: await prisma.record.findMany(),
	};
};

export const actions: Actions = {
	createRecord: async ({ request }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.record.create({ data: { title, content } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

		return { status: 201 };
	},

	deleteRecord: async ({ url }) => {
		const id = url.searchParams.get('id');

		if (!id) {
			return fail(400, { message: 'плохой реквест' });
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
