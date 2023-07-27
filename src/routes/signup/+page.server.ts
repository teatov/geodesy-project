import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { Prisma } from '@prisma/client';
import { signupSchema } from '$lib/zod/schema';

export const load: PageServerLoad = async ({ locals }) => {
	// throw redirect(302, '/');

	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(signupSchema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signupSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { fullName, email, password } = form.data;

		try {
			await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: email,
					password,
				},
				attributes: {
					fullName,
					email,
				},
			});
		} catch (err) {
			console.error(err);

			let message = 'При регистрации возникла ошибка';

			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					message = 'Пользователь с такой почтой уже существует';
				}
			}

			return setError(form, null, message);
		}
		throw redirect(302, '/login');
	},
};
