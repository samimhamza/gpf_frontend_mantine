import { logColumns } from ".";
import { getDate } from "../functions";

export const ApplicantSurveyColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{
			accessor: "id",
			hidden: true,
		},
		{
			accessor: "survey_date",
			title: t("survey_date"),
			noWrap: true,
			sortable: true,
			render: ({ survey_date }: { survey_date: string }) =>
				survey_date ? getDate(survey_date) : "",
		},
		{
			accessor: "category_name",
			title: t("category"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "charity_package.name",
			title: t("package"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "charity_package.period",
			title: t("period"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "implements_count",
			title: t("implements_count"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "items",
			title: t("items_count"),
			noWrap: true,
			sortable: true,
			render: (record: any) => record.charity_package.items.length,
		},
		{
			accessor: "charity_package.start_date",
			title: t("start_date"),
			noWrap: true,
			sortable: true,
			render: (record: any) =>
				record.charity_package.start_date
					? getDate(record.charity_package.start_date)
					: "",
		},
		{
			accessor: "charity_package.end_date",
			title: t("end_date"),
			noWrap: true,
			sortable: true,
			render: (record: any) =>
				record.charity_package.end_date
					? getDate(record.charity_package.end_date)
					: "",
		},
		{
			accessor: "charity_package.cash_amount",
			title: t("cash_amount"),
			noWrap: true,
			sortable: true,
			render: (record: any) =>
				record.charity_package.cash_amount +
				" " +
				(record.charity_package.currency == "USD"
					? t("usd")
					: record.charity_package.currency == "AFN"
					? t("afn")
					: ""),
		},
		...logs,
	];
};
