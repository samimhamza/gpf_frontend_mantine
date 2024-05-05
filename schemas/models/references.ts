import * as z from "zod";

export const ReferenceSchema = (t: (arg: string) => string) => {
	return z.object({
		office_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("min_2_length_error"),
			})
			.max(64, {
				message: t("max_16_length_error"),
			}),
		first_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
		last_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
		father_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
		position_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
		job_location: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
		user_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(2, {
				message: t("min_2_length_error"),
			})
			.max(16, {
				message: t("max_16_length_error"),
			}),
	});
};
