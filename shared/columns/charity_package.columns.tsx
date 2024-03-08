import { logColumns } from ".";

export const CharityPackageColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{ accessor: "id", hidden: true },
		{ accessor: "office_id", hidden: true },
		{
			accessor: "office_name",
			title: t("office"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "name",
			title: t("name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "period",
			title: t("period"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "start_date",
			title: t("start_date"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "end_date",
			title: t("end_date"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "cash_amount",
			title: t("cash_amount"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "currency",
			title: t("currency"),
			noWrap: true,
			sortable: true,
		},
		...logs,
	];
};
