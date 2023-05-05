import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import createReport from 'docx-templates';
import fs from 'fs';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { user, session } = await locals.auth.validateUser();
	if (!(user && session)) {
		throw redirect(302, '/');
	}

	const survey = await prisma.survey.findUniqueOrThrow({
		where: {
			id: params.id,
		},
		include: {
			federalSubject: true,
		},
	});

	const template = fs.readFileSync('./templates/surveyCardTemplate2.docx');

	const buffer = await createReport({
		template,
		data: {
			$workBy: survey.workBy,
		},
	});

	fs.writeFileSync('report.docx', buffer);

	throw redirect(303, '/');
	// return {
	// 	status: 200,
	// 	headers: {
	// 		'Content-type': 'application/docx',
	// 		'Content-Disposition': `attachment; filename=${params.id}.docx`,
	// 	},
	// 	body: buffer,
	// };
};
