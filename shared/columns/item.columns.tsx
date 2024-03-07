import { logColumns } from ".";

export const ItemColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	return [
		{ accessor: "id", hidden: true },
		{
			accessor: "name",
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
		...logs,
	];
};
