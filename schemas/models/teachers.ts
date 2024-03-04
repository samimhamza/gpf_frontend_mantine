import * as z from "zod";
import { phoneRegex } from "..";

export const TeacherSchema = (t: (arg: string) => string) => {
	return z.object({
		name: z
			.string({
				invalid_type_error: t("field_required"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		father_name: z
			.string({
				invalid_type_error: t("field_required"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		last_name: z
			.string({
				invalid_type_error: t("field_required"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		phone: z.string().regex(phoneRegex, t("invalid_email")),
	});
};
