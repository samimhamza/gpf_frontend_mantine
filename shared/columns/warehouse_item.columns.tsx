import { logColumns } from ".";
import { getDate } from "../functions";

export const WarehouseItemColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{ accessor: "id", hidden: true },
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
			render: ({ store_date }: { store_date: string }) => getDate(store_date),
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
			accessor: "name",
			title: t("item"),
			noWrap: true,
			width: "50%",
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
			width: "50%",
			textAlign: "center",
			render: (item: any) => item.total_quantity + " " + item.pivot.unit,
		},
	];
};
