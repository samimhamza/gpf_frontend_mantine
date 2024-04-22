import * as z from "zod";

export const QuestionSchema = (t: (arg: string) => string) => {
  return z
    .object({
      code: z
        .string({
          invalid_type_error: t("invalid_type"),
        })
        .min(2, {
          message: t("min_3_length_error"),
        })
        .max(16, {
          message: t("max_64_length_error"),
        }),
      question: z
        .string({
          invalid_type_error: t("invalid_type"),
        })
        .min(3, {
          message: t("min_3_length_error"),
        })
        .max(255, {
          message: t("max_64_length_error"),
        }),
      type: z
        .string({
          invalid_type_error: t("invalid_type"),
        })
        .min(1, {
          message: t("field_required"),
        }),
      mark: z.string().regex(/^[0-9\-]*$/, t("only_number_allowed")),
      choices: z
        .array(
          z.object({
            answer: z
              .string({
                invalid_type_error: t("invalid_type"),
              })
              .min(1, {
                message: t("field_required"),
              }),
            mark: z.string().regex(/^-?\d+(\.\d+)?$/, t("only_number_allowed")),
          })
        )
        .superRefine((choices, ctx) => {
          const uniqueItemsCount = new Set(
            choices.map((value: any) => value.answer)
          ).size;
          const errorPosition = choices.length - 1;
          if (uniqueItemsCount !== choices.length) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("value_already_exists"),
              path: [errorPosition, "answer"],
            });
          }
        }),
    })
    .superRefine((values, ctx) => {
      if (values.type == "descriptive" && !values.mark) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("field_required"),
          path: ["mark"],
        });
      }
    });
};
