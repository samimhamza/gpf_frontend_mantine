import * as z from "zod";

export const CreateUserSchema = (t: (arg: string) => string) => {
	return z
		.object({
			full_name: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.min(3, {
					message: t("min_3_length_error"),
				})
				.max(64, {
					message: t("max_64_length_error"),
				}),
			office_id: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.min(1, {
					message: t("field_required"),
				}),
			email: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.email(t("invalid_email")),
			username: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.min(3, { message: t("min_3_length_error") })
				.max(64, { message: t("max_64_length_error") }),

			password: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.min(8, { message: t("password_min") }),
			confirm_password: z
				.string({
					invalid_type_error: t("field_required"),
				})
				.min(8, { message: t("password_min") }),
		})
		.refine((data) => data.password === data.confirm_password, {
			message: t("password_not_match"),
			path: ["confirm_password"],
		});
};

export const EditUserSchema = (t: (arg: string) => string) => {
	return z.object({
		full_name: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(3, {
				message: t("min_3_length_error"),
			})
			.max(64, {
				message: t("max_64_length_error"),
			}),
		office_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
		email: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.email(t("invalid_email")),
		username: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(3, { message: t("min_3_length_error") })
			.max(64, { message: t("max_64_length_error") }),
	});
};
