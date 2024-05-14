
import * as z from "zod";

export const ExportFileSchema = (t: (arg: string) => string) => {
  return z.object({
    downloadType: z
      .string({
        invalid_type_error: t("field_required"),
      }) .min(1, {
	    message: t("field_required"),
	  }),   
    downloadSize: z
      .string({
        invalid_type_error: t("field_required"),
      }) .min(1, {
	    message: t("field_required"),
	  }),   
  });
};
