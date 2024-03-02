import * as z from "zod";

export const SchoolSchema = (t: (arg: string) => string) => {
	return z.object({
		name: z
			.string()
			.min(3, {
				message: t("min_length_error"),
			})
			.max(64, {
				message: t("full_name_max"),
			}),
		office_id: z.string().min(1, {
			message: t("office_required"),
		}),
		province_id: z.string().min(1, {
			message: t("office_required"),
		}),
		district_id: z.string().min(1, {
			message: t("office_required"),
		}),
		type: z.string().min(1, {
			message: t("office_required"),
		}),
		total_staff: z.string().min(1, {
			message: t("office_required"),
		}),
	});
};
