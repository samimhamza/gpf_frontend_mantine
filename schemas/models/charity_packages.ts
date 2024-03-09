import * as z from "zod";

export const CharityPackageSchema = (t: (arg: string) => string) => {
	return z.object({
		office_id: z
			.string({
				invalid_type_error: t("invalid_type"),
			})
			.min(1, {
				message: t("field_required"),
			}),
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
		period: z.string().regex(/^[0-9\-]+$/, t("only_number_allowed")),
		cash_amount: z.string().regex(/^[0-9\-]*$/, t("only_number_allowed")),
		items: z
			.array(
				z.object({
					item_id: z
						.string({
							invalid_type_error: t("invalid_type"),
						})
						.min(1, {
							message: t("field_required"),
						}),
					quantity: z.string().regex(/^[0-9\-]+$/, t("only_number_allowed")),
					unit: z
						.string({
							invalid_type_error: t("invalid_type"),
						})
						.min(1, {
							message: t("field_required"),
						}),
				})
			)
			.superRefine((items, ctx) => {
				const uniqueItemsCount = new Set(
					items.map((value: any) => value.item_id)
				).size;
				const errorPosition = items.length - 1;
				if (uniqueItemsCount !== items.length) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: t("value_already_exists"),
						path: [errorPosition, "item_id"],
					});
				}
			}),
	});
};
