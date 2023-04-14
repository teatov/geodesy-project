import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
	switch (error.code) {
		case z.ZodIssueCode.too_small:
			return { message: `Длина должна быть больше чем ${error.minimum}` };
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

const stringParams = { errorMap: customErrorMap };

export const recordSchema = z.object({
	title: z.string(stringParams).min(1).max(100).trim(),
	content: z.string(stringParams).min(1).max(500).trim(),
});

export const loginSchema = z.object({
	email: z.string(stringParams).email().min(1).max(500).trim(),
	password: z.string(stringParams).min(1).max(100).trim(),
});

export const signupSchema = z.object({
	fullName: z.string(stringParams).min(1).max(100).trim(),
	email: z.string(stringParams).email().min(1).max(500).trim(),
	password: z.string(stringParams).min(1).max(100).trim(),
});
