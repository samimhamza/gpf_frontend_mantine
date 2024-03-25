import * as z from "zod";

export const ApplicantImplementsSchema = (t: (arg: string) => string) => {
	return z.object({
		description: z.string().nullable(),
	});
};
