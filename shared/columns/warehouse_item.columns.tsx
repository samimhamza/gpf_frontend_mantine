import { logColumns } from ".";
import { getDate } from "../functions";

export const WarehouseItemColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{
			accessor: "id",
			title: t("id"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "item_name",
			title: t("name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "unit",
			title: t("unit"),
			hidden: true,
		},
		{
			accessor: "quantity",
			title: t("quantity"),
			noWrap: true,
			sortable: true,
			render: ({ unit, quantity }: { unit: string; quantity: string }) =>
				quantity + " " + unit,
		},
		{
			accessor: "store_date",
			title: t("store_date"),
			noWrap: true,
			sortable: true,
			render: ({ store_date }: { store_date: string }) =>
				store_date ? getDate(store_date) : "",
		},
		...logs,
	];
};
export const WarehouseItemTotalColumns = (t: (arg: string) => string) => {
	return [
		{
			accessor: "item_id",
			hidden: true,
		},
		{
			accessor: "item_name",
			title: t("item"),
			noWrap: true,
			textAlign: "center",
		},
		{
			accessor: "unit",
			hidden: true,
		},
		{
			accessor: "total_quantity",
			title: t("total_quantity"),
			noWrap: true,
			textAlign: "center",
			render: (item: any) => item.total_quantity + " " + item.item_unit,
		},
		{
			accessor: "total_implements",
			title: t("total_implements"),
			noWrap: true,
			textAlign: "center",
			render: (item: any) => item.total_implements + " " + item.item_unit,
		},
		{
			accessor: "remaining_quantity",
			title: t("remaining_quantity"),
			noWrap: true,
			textAlign: "center",
			render: (item: any) =>
				item.total_quantity - item.total_implements + " " + item.item_unit,
		},
	];
};
