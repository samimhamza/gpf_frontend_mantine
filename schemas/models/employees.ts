import * as z from "zod";
import { phoneRegex } from "..";

export const EmployeeSchema = (t: (arg: string) => string) => {
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
      .min(3, {
        message: t("min_3_length_error"),
      })
      .max(64, {
        message: t("max_64_length_error"),
      }),
    last_name: z
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
    gender: z
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
    phone: z
      .string({
        invalid_type_error: t("field_required"),
      })
      .min(1, {
        message: t("field_required"),
      })
      .regex(phoneRegex, t("invalid_phone")),
  });
};
