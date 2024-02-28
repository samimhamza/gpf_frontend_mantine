import * as z from "zod";

export const UserSchema = (t: (arg: string) => string) =>
	z
		.object({
			full_name: z
				.string()
				.min(3, {
					message: t("full_name_min"),
				})
				.max(64, {
					message: t("full_name_max"),
				}),
			office_id: z.string().min(1, {
				message: t("office_required"),
			}),
			email: z.string().email(t("invalid_email")),
			username: z
				.string()
				.min(3, { message: t("username_min") })
				.max(64, { message: t("username_max") }),
			password: z.string().min(8, { message: t("password_min") }),
			password_confirmation: z.string().min(8, { message: t("password_min") }),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: t("password_not_match"),
			path: ["password_confirmation"],
		});
