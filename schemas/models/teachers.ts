import * as z from "zod";
import { phoneRegex } from "..";

export const TeacherSchema = (t: (arg: string) => string) => {
	return z.object({
		first_name: z
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
			.max(64, {
				message: t("max_64_length_error"),
			})
			.nullable(),
		last_name: z
			.string({
				invalid_type_error: t("field_required"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			})
			.nullable(),
		phone: z.string().regex(phoneRegex, t("invalid_phone")),
		national_id: z.string().regex(/^[0-9\-]*$/, t("only_number_allowed")),
		school_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		staff_type: z.string().min(1, {
			message: t("field_required"),
		}),
		gender: z.string().min(1, {
			message: t("field_required"),
		}),
		current_residence_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		type: z.string().min(1, {
			message: t("field_required"),
		}),
	});
};
