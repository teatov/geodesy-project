import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
	switch (error.code) {
		case z.ZodIssueCode.invalid_type:
			if (error.expected === 'number') {
				return { message: 'В поле должно быть число' };
			} else if (error.expected === 'date') {
				return { message: 'В поле должна быть дата' };
			} else if (error.expected === 'string') {
				return { message: 'В поле должен быть текст' };
			} else {
				return { message: `В поле должен быть тип данных ${error.expected}` };
			}
			break;
		case z.ZodIssueCode.too_small:
			return { message: 'Поле обязательно' };
			break;
		case z.ZodIssueCode.too_big:
			return { message: `Длина должна быть меньше чем ${error.maximum}` };
			break;
		case z.ZodIssueCode.invalid_string:
			if (error.validation === 'email') {
				return { message: `Некорректный почтовый адрес` };
			}
			break;
	}

	return { message: ctx.defaultError };
};

export function setErrorMap() {
	z.setErrorMap(customErrorMap);
}

export const recordSchema = z.object({
	title: z.string().min(1).max(100).trim(),
	content: z.string().min(1).max(500).trim(),
});

export const loginSchema = z.object({
	email: z.string().email().min(1).max(500).trim(),
	password: z.string().min(1).max(100).trim(),
});

export const signupSchema = z.object({
	fullName: z.string().min(1).max(100).trim(),
	email: z.string().email().min(1).max(500).trim(),
	password: z.string().min(1).max(100).trim(),
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const surveySchema = z.object({
	workBy: z.string().min(1).max(300).trim(),
	surveyDate: z.date(),
	federalSubject: z.string().min(1).max(200).trim(),
	markerIndex: z.string().min(1).max(200).trim().optional(),
	markerName: z.string().min(1).max(200).trim(),
	placingYear: z.number().optional(),
	signHeight: z.number().positive(),
	centerType: z.string().min(1).max(200).trim().optional(),
	altitude: z.number().optional(),
	trapezes: z.string().min(1).max(200).trim().optional(),
	coordinates: z.string().min(1).max(200).trim(),
	signMainType: z.string().min(1).max(200).trim(),
	signMaterial: z.string().max(200).trim(),
	signSides: z.string().max(200).trim(),
	signalType: z.string().max(200).trim(),
	postType: z.string().max(200).trim(),
	signPresence: z.string().min(1).max(200).trim(),
	monolith1Integrity: z.string().min(1).max(200).trim(),
	monolith2Openness: z.string().min(1).max(200).trim(),
	monoliths3And4Openness: z.string().min(1).max(200).trim(),
	outerSignIntegrity: z.string().min(1).max(200).trim(),
	orp1Integrity: z.string().min(1).max(200).trim(),
	orp2Integrity: z.string().min(1).max(200).trim(),
	trenchReadability: z.string().min(1).max(200).trim(),
	upperMarkBelowGroundHeight: z.number().positive(),
	satelliteObservability: z.string().min(1).max(200).trim(),
	extraNotes: z.string().min(1).max(1000).trim().optional(),
	createdBy: z.string().min(1).max(200).trim(),
	exteriorPhoto: z.any().optional(),
	centerMarkPhoto: z.any().optional(),
});

export const surveySearchSchema = z.object({
	federalSubject: z.string().min(1).max(200).trim().optional(),
	placingYear: z.number().optional(),
	markerIndex: z.string().max(200).trim().optional(),
	markerName: z.string().min(1).max(200).trim().optional(),
	workBy: z.string().min(1).max(300).trim().optional(),
	createdBy: z.string().min(1).max(200).trim().optional(),
});
