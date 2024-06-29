import * as z from 'zod';

export const InvoiceItemSchema = (t: (arg: string) => string) => {
	return z.object({
		item_id: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		item_unit: z.string().optional(),
		remarks: z.string().optional(),
		quantity: z
			.number({
				invalid_type_error: t('invalid_type'),
			})
			.min(0, {
				message: t('only_positive_number_allowed'),
			}),
		unit_price: z
			.number({
				invalid_type_error: t('invalid_type'),
			})
			.min(0, {
				message: t('only_positive_number_allowed'),
			}),
		total_price: z
			.number({
				invalid_type_error: t('invalid_type'),
			})
			.min(0, {
				message: t('only_positive_number_allowed'),
			}),
	});
};

export const InvoiceWithItemsSchema = (t: (arg: string) => string) => {
	return z.object({
		purchased_by: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		warehouse_id: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		invoice_number: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		vendor_name: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		purchase_date: z.number().optional(),
		due_date: z.number().optional(),
		payment_status: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		total_price: z
			.number({
				invalid_type_error: t('invalid_type'),
			})
			.min(0, {
				message: t('only_positive_number_allowed'),
			}),
		remarks: z.string().optional(),
		invoice_items: z
			.array(InvoiceItemSchema(t))
			.superRefine((invoice_items, ctx) => {
				const seen = new Map<string, number>();
				invoice_items.forEach((item, index) => {
					if (seen.has(item.item_id)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: t('value_already_exists'),
							path: [index, 'item_id'],
						});
					} else {
						seen.set(item.item_id, index);
					}
				});
			}),
	});
};

export const InvoiceSchema = (t: (arg: string) => string) => {
	return z.object({
		purchased_by: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		invoice_number: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		vendor_name: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(3, {
				message: t('min_3_length_error'),
			})
			.max(64, {
				message: t('max_64_length_error'),
			}),
		purchase_date: z.number().optional(),
		due_date: z.number().optional(),
		payment_status: z
			.string({
				invalid_type_error: t('invalid_type'),
			})
			.min(1, {
				message: t('field_required'),
			}),
		total_price: z
			.number({
				invalid_type_error: t('invalid_type'),
			})
			.min(0, {
				message: t('only_positive_number_allowed'),
			}),
		remarks: z.string().optional(),
	});
};
