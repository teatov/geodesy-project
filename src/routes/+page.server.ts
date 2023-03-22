import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		records: await prisma.test.findMany(),
	};
};

export const actions: Actions = {
	createRecord: async ({ request }) => {
		const { title, text } = Object.fromEntries(await request.formData()) as {
			title: string;
			text: string;
		};

		try {
			await prisma.test.create({ data: { title, text } });
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
			await prisma.test.delete({ where: { id: Number(id) } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

        return { status: 200 };
	},
};
