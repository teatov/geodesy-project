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
	markerIndex: z.string().max(200).trim(),
	markerName: z.string().min(1).max(200).trim(),
	placingYear: z.number(),
	signHeight: z.number(),
	centerType: z.string().max(200).trim(),
	altitude: z.number(),
	trapezes: z.string().max(200).trim(),
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
	upperMarkBelowGroundHeight: z.number(),
	satelliteObservability: z.string().min(1).max(200).trim(),
	extraNotes: z.string().max(1000).trim(),
	createdBy: z.string().min(1).max(200).trim(),
	exteriorPhoto: z
		.any(),
		// .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		// .refine(
		// 	(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
		// 	'Only .jpg, .jpeg, .png and .webp formats are supported.'
		// ),
	centerMarkPhoto: z
		.any(),
		// .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		// .refine(
		// 	(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
		// 	'Only .jpg, .jpeg, .png and .webp formats are supported.'
		// ),
	extraPhotos: z
		.any(),
		// .refine((files) => files?.length == 1, 'Image is required.')
		// .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
		// .refine(
		// 	(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
		// 	'.jpg, .jpeg, .png and .webp files are accepted.'
		// ),
});
