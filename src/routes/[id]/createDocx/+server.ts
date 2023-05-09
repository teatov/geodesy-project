import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import {
	SignType,
	PresenceState,
	IntegrityState,
	OpennessState,
	ReadabilityState,
	ObservabilityState,
} from '@prisma/client';
import createReport from 'docx-templates';
import fs from 'fs';

function getStateString(
	state: PresenceState | IntegrityState | OpennessState | ReadabilityState | ObservabilityState
): string {
	switch (state) {
		case PresenceState.PRESENT:
			return 'Присутствует';
		case PresenceState.MISSING:
			return 'Отсутствует';
		case IntegrityState.INTACT:
			return 'Сохранился';
		case IntegrityState.NOT_INTACT:
			return 'Не сохранился';
		case OpennessState.OPENED:
			return 'Вскрывался';
		case OpennessState.NOT_OPENED:
			return 'Не вскрывался';
		case ReadabilityState.READABLE:
			return 'Читается';
		case ReadabilityState.UNREADABLE:
			return 'Не читается';
		case ObservabilityState.OBSERVABLE:
			return 'Возможны';
		case ObservabilityState.CONDITIONALLY_OBSERVABLE:
			return 'Условно возможны';
		case ObservabilityState.UNOBSERVABLE:
			return 'Невозможны';

		default:
			return '-';
	}
}

function getRecoveryRecommendations(
	state: PresenceState | IntegrityState | OpennessState | ReadabilityState
): string {
	const recoveryRequired = 'Необходимо восстановить';
	const recoveryNotRequired = 'Нет необходимости';

	if (
		state === PresenceState.MISSING ||
		state === IntegrityState.NOT_INTACT ||
		state === OpennessState.OPENED ||
		state === ReadabilityState.UNREADABLE
	) {
		return recoveryRequired;
	}

	if (
		state === PresenceState.PRESENT ||
		state === IntegrityState.INTACT ||
		state === OpennessState.NOT_OPENED ||
		state === ReadabilityState.READABLE
	) {
		return recoveryNotRequired;
	}

	return '-';
}

function getSignTypeString(state: SignType): string {
	switch (state) {
		case SignType.SIGNAL_SIMPLE:
			return 'Сигнал простой';
		case SignType.SIGNAL_COMPLEX:
			return 'Сигнал сложный';
		case SignType.PYRAMID_WOOD_THREE_SIDED:
			return 'Пирамида деревянная трёхгранная';
		case SignType.PYRAMID_WOOD_FOUR_SIDED:
			return 'Пирамида деревянная четырёхгранная';
		case SignType.PYRAMID_METAL_THREE_SIDED:
			return 'Пирамида металлическая трёхгранная';
		case SignType.PYRAMID_METAL_FOUR_SIDED:
			return 'Пирамида металлическая четырёхгранная';
		case SignType.STAND_WOOD_THREE_SIDED:
			return 'Штатив деревянный трёхгранный';
		case SignType.STAND_WOOD_FOUR_SIDED:
			return 'Штатив деревянный четырёхгранный';
		case SignType.STAND_METAL_THREE_SIDED:
			return 'Штатив металлический трёхгранный';
		case SignType.STAND_METAL_FOUR_SIDED:
			return 'Штатив металлический четырёхгранный';
		case SignType.POST_CONCRETE:
			return 'Тур бетонный';
		case SignType.POST_ROCK:
			return 'Тур каменный';
		case SignType.POST_BRICK:
			return 'Тур кирпичный';

		default:
			return '-';
	}
}

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
			$createdAt: survey.createdAt.getDate(),
			$approvedBy: survey.approvedBy,
			$approvedAt: survey.approvedAt?.getDate() || '',
		},
		additionalJsContext: {
			centerMarkPhoto: () => {
				const data = fs.readFileSync('./static/favicon.png');
				return { width: 3, height: 3, data, extension: '.png' };
			},
			exteriorPhoto: () => {
				const data = fs.readFileSync('./static/favicon.png');
				return { width: 3, height: 3, data, extension: '.png' };
			},
			extraPhoto1: () => {
				const data = fs.readFileSync('./static/favicon.png');
				return { width: 3, height: 3, data, extension: '.png' };
			},
			extraPhoto2: () => {
				const data = fs.readFileSync('./static/favicon.png');
				return { width: 3, height: 3, data, extension: '.png' };
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
