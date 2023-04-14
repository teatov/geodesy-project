import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const signupSchema = z.object({
	fullName: z.string().min(1).max(100).trim(),
	email: z.string().email().min(1).max(500).trim(),
	password: z.string().min(1).max(100).trim(),
});

export const load: PageServerLoad = async ({ locals }) => {
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
			return fail(400, { message: 'При регистрации возникла ошибка' });
		}
		throw redirect(302, '/login');
	},
};
