import * as z from "zod";

export const UserSchema = (t: (arg: string) => string) =>
	z.object({
		full_name: z.string().min(1, {
			message: t("email_or_username_required"),
		}),
		password: z.string().min(1, {
			message: t("password_required"),
		}),
	});
