import * as z from "zod";
import { phoneRegex } from "..";

export const SchoolSchema = (t: (arg: string) => string) => {
	return z.object({
		name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		total_staff: z.string().regex(/^[0-9\-]+$/, t("only_number_allowed")),
		head_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		head_phone: z.string().regex(phoneRegex, t("invalid_phone")),
		office_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		province_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		district_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		type: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
	});
};
