import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { getStateString, getRecoveryRecommendations, getSignTypeString } from '$lib/infoStorage';
// import pkg from 'docx-templates';
import createReport from 'docx-templates';

import fs from 'fs';

// const { createReport } = pkg;

export const GET: RequestHandler = async ({ params, locals }) => {
	// const { user, session } = await locals.auth.validateUser();
	// if (!(user && session)) {
	// 	throw redirect(302, '/');
	// }

	const survey = await prisma.survey.findUniqueOrThrow({
		where: {
			id: params.id,
		},
		include: {
			federalSubject: true,
		},
	});

	const template = fs.readFileSync('./templates/surveyCardTemplate.docx');

	const buffer = await createReport({
		template,
		data: {
			$surveyYear: survey.surveyDate.getFullYear(),
			$workBy: survey.workBy,
			$markerIndex: survey.markerIndex,
			$markerName: survey.markerName,
			$placingYear: survey.placingYear,
			$signType: getSignTypeString(survey.signType),
			$signHeight: survey.signHeight,
			$centerType: survey.centerType,
			$altitude: survey.altitude,
			$trapezes: survey.trapezes,
			$federalSubject: survey.federalSubject.name,
			$signPresence: getStateString(survey.signPresence),
			$signPresenceRecom: getRecoveryRecommendations(survey.signPresence),
			$monolith1Integrity: getStateString(survey.monolith1Integrity),
			$monolith1IntegrityRecom: getRecoveryRecommendations(survey.monolith1Integrity),
			$monolith2Openness: getStateString(survey.monolith2Openness),
			$monolith2OpennessRecom: getRecoveryRecommendations(survey.monolith2Openness),
			$monoliths3And4Openness: getStateString(survey.monoliths3And4Openness),
			$monoliths3And4OpennessRecom: getRecoveryRecommendations(survey.monoliths3And4Openness),
			$outerSignIntegrity: getStateString(survey.outerSignIntegrity),
			$outerSignIntegrityRecom: getRecoveryRecommendations(survey.outerSignIntegrity),
			$orp1Integrity: getStateString(survey.orp1Integrity),
			$orp1IntegrityRecom: getRecoveryRecommendations(survey.orp1Integrity),
			$orp2Integrity: getStateString(survey.orp2Integrity),
			$orp2IntegrityRecom: getRecoveryRecommendations(survey.orp2Integrity),
			$trenchReadability: getStateString(survey.trenchReadability),
			$trenchReadabilityRecom: getRecoveryRecommendations(survey.trenchReadability),
			$aboveOrBelow: survey.upperMarkBelowGroundHeight > 0 ? 'ниже' : 'выше',
			$upperMarkBelowGroundHeight: Math.abs(survey.upperMarkBelowGroundHeight),
			$satelliteObservability: getStateString(survey.satelliteObservability),
			$createdBy: survey.createdBy,
			$createdAt: [
				String(survey.createdAt.getDate()).padStart(2, '0'),
				String(survey.createdAt.getMonth() + 1).padStart(2, '0'),
				survey.createdAt.getFullYear(),
			].join('.'),
			$approvedBy: survey.approvedBy,
			$approvedAt: survey.approvedAt
				? [
						String(survey.approvedAt.getDate()).padStart(2, '0'),
						String(survey.approvedAt.getMonth() + 1).padStart(2, '0'),
						survey.approvedAt.getFullYear(),
				  ].join('.')
				: '',
		},
		additionalJsContext: {
			centerMarkPhoto: () => {
				const data = fs.readFileSync(`./static/surveyPhotos/${survey.centerMarkPhoto}`);
				return { width: 8, height: 8, data, extension: '.png' };
			},
			exteriorPhoto: () => {
				const data = fs.readFileSync(`./static/surveyPhotos/${survey.exteriorPhoto}`);
				return { width: 8, height: 8, data, extension: '.png' };
			},
		},
	});

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'application/docx',
			'Content-Disposition': `attachment; filename=${params.id}.docx`,
		},
	});
};
