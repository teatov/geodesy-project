import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { fullName, email, password } = Object.fromEntries(await request.formData()) as {
			fullName: string;
			email: string;
			password: string;
		};

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
