import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { recordSchema } from '$lib/zod/schema';

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

	const form = await superValidate(record, recordSchema);

	if (record.authUserId !== user.userId) {
		throw error(403, 'Вы не можете редактировать чужие записи');
	}

	return { form, record };
};

export const actions: Actions = {
	updateRecord: async ({ request, params, locals }) => {
		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, recordSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, content } = form.data;

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

			const message = 'При обновлении записи возникла ошибка';

			return setError(form, null, message);
		}

		throw redirect(303, '/');
	},

	deleteRecord: async ({ params }) => {
		const id = params.id;

		try {
			await prisma.record.delete({ where: { id: id } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось удалить' });
		}

		throw redirect(303, '/');
	},
};
