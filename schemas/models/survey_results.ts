import * as z from "zod";

export const SurveyResultSchema = (t: (arg: string) => string) => {
	return z.object({
		category_id: z.string().nullable(),
		charity_package_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		description: z.string().nullable(),
	});
};
