import { logColumns } from ".";

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
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "quantity",
			title: t("quantity"),
			noWrap: true,
			sortable: true,
		},
		...logs,
	];
};
