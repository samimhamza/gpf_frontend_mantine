import { logColumns } from ".";
import { getDate } from "../functions";

export const CharityPackageColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{ accessor: "id", hidden: true },
		{
			accessor: "office_name",
			title: t("office"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "category_name",
			title: t("category"),
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
			accessor: "items_count",
			title: t("total_items"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "start_date",
			title: t("start_date"),
			noWrap: true,
			sortable: true,
			render: ({ start_date }: { start_date: string }) =>
				start_date ? getDate(start_date) : "",
		},
		{
			accessor: "end_date",
			title: t("end_date"),
			noWrap: true,
			sortable: true,
			render: ({ end_date }: { end_date: string }) =>
				end_date ? getDate(end_date) : "",
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
			render: ({ currency }: { currency: string }) =>
				currency == "USD" ? t("usd") : currency == "AFN" ? t("afn") : "",
		},
		...logs,
	];
};
