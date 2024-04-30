import * as z from "zod";

export const TeamsSchema = (t: (arg: string) => string) => {
  return z.object({
    name: z
      .string({
        invalid_type_error: t("invalid_type"),
      })
      .min(1, {
        message: t("min_1_length_error"),
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
    members: z
      .string()
      .array()
      .nonempty({ message: t("field_required") }),
  });
};
