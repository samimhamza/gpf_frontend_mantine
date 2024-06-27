import * as z from "zod";

export const SurveyPlanQuestionsSchema = (t: (arg: string) => string) => {
  return z.object({
    questions: z
      .string()
      .array()
      .nonempty({ message: t("field_required") }),
  });
};
