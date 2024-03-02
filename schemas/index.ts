import * as z from "zod";

export const LoginSchema = (t: (arg: string) => string) =>
	z.object({
		email_or_username: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("email_or_username_required"),
			}),
		password: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("password_required"),
			}),
	});
