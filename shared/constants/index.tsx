export const SurveyTypes = (t: (arg: string) => string) => [
	{ value: "survey", label: t("survey") },
	{ value: "without_survey", label: t("without_survey") },
];

export const StaffTypes = (t: (arg: string) => string) => [
	{ value: "formal_teacher", label: t("formal_teacher") },
	{ value: "informal_teacher", label: t("informal_teacher") },
	{ value: "school_employee", label: t("school_employee") },
];

export const Genders = (t: (arg: string) => string) => [
	{ value: "male", label: t("male") },
	{ value: "female", label: t("female") },
];

export const getType = (
	items: Array<{ value: string; label: string }>,
	value: string
) => {
	return items.find(
		(item: { value: string; label: string }) => item.value == value
	)?.label;
};
