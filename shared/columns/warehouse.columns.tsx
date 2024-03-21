import { logColumns } from ".";

export const WarehouseColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{
			accessor: "id",
			title: t("id"),
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
			accessor: "office_code",
			title: t("office"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "province_name_fa",
			title: t("province"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "items_count",
			title: t("total_items"),
			noWrap: true,
			sortable: true,
		},
		...logs,
	];
};
