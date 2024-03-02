import * as z from "zod";

export const SchoolSchema = (t: (arg: string) => string) => {
	return z.object({
		name: z
			.string()
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		total_staff: z
			.number({
				required_error: t("field_required"),
				invalid_type_error: t("must_be_number"),
			})
			.positive({
				message: t("could_not_be_negative"),
			}),
		head_name: z.string().min(1, {
			message: t("field_required"),
		}),
		office_id: z.string().min(1, {
			message: t("field_required"),
		}),
		province_id: z.string().min(1, {
			message: t("field_required"),
		}),
		district_id: z.string().min(1, {
			message: t("field_required"),
		}),
		type: z.string().min(1, {
			message: t("field_required"),
		}),
	});
};
