import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import { fail, redirect, error } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { recordSchema } from '$lib/zod/schema';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.expected === 'string') {
			return { message: 'bad type!' };
		}
	}
	if (issue.code === z.ZodIssueCode.custom) {
		return { message: `less-than-${(issue.params || {}).minimum}` };
	}
	return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const load: PageServerLoad = async () => {
	const records = await prisma.record.findMany();

	const form = await superValidate(recordSchema);

	return { form, records };
};

export const actions: Actions = {
	createRecord: async ({ request, locals }) => {
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
			await prisma.record.create({
				data: {
					title,
					content,
					authUserId: user.userId,
				},
			});
		} catch (error) {
			console.error(error);

			const message = 'При создании записи возникла ошибка';

			return setError(form, null, message);
		}

		return { status: 201 };
	},
};
