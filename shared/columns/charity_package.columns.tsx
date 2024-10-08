import { Center } from "@mantine/core";
import { logColumns } from ".";
import { getDate } from "../functions";

export const CharityPackageColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{
			accessor: "id",
			title: t("id"),
			noWrap: true,
			sortable: true,
			render: ({ id }: { id: number }) => <Center>{id}</Center>,
		},
		{
			accessor: "office_code",
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
			render: (record: any) =>
				record.cash_amount
					? record.cash_amount +
					  " " +
					  (record.currency == "USD"
							? t("usd")
							: record.currency == "AFN"
							? t("afn")
							: "")
					: "",
		},
		...logs,
	];
};
