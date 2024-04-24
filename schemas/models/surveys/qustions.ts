import * as z from "zod";

export const DescriptiveQuestionSchema = (t: (arg: string) => string) => {
  return z.object({
    code: z
      .string({
        invalid_type_error: t("invalid_type"),
      })
      .min(1, {
        message: t("field_required"),
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
        message: t("max_255_length_error"),
      }),
    type: z
      .string({
        invalid_type_error: t("invalid_type"),
      })
      .min(1, {
        message: t("field_required"),
      }),
    mark: z
      .string({
        invalid_type_error: t("invalid_type"),
      })
      .regex(/^[0-9\-]*$/, t("only_number_allowed"))
      .min(1, {
        message: t("field_required"),
      }),
  });
};

export const MultipleChoiceQuestionSchema = (t: (arg: string) => string) => {
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
          message: t("max_255_length_error"),
        }),
      type: z
        .string({
          invalid_type_error: t("invalid_type"),
        })
        .min(1, {
          message: t("field_required"),
        }),
      choices: z
        .array(
          z.object({
            answer: z
              .string({
                invalid_type_error: t("invalid_type"),
              })
              .min(1, {
                message: t("field_required"),
              })
              .max(255, {
                message: t("max_255_length_error"),
              }),
            mark: z.string().regex(/^-?\d+(\.\d+)?$/, t("only_number_allowed")),
          })
        )
        .superRefine((choices, ctx) => {
          const uniqueItemsCount = new Set(
            choices.map((value: any) => value.answer)
          ).size;
          if (uniqueItemsCount !== choices.length) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("value_already_exists"),
              path: [choices.length - 1, "answer"],
            });
          }
        }),
    })
    .superRefine((values, ctx) => {
      console.log(values.choices.length);

      if (values.choices.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("min_2_choice_required"),
          path: [0, "answer"],
        });
      }
    });
};
