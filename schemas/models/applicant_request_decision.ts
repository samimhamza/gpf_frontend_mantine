import * as z from 'zod';

export const ApplicantRequestDecisionSchema = (t: (arg: string) => string) => {
	return z.object({
		reason: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
	});
};
