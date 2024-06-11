import * as z from 'zod';
import { phoneRegex } from '..';

export const GeneralApplicantSchema = (t: (arg: string) => string) => {
	return z.object({
		name: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		agent_name: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		agent_phone: z.string().regex(phoneRegex, t('invalid_phone')),
		applicant_type: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		address: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),

		province_id: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		district_id: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		referenced_by: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
	});
};
