import { Center } from "@mantine/core";
import { logColumns } from ".";

export const ItemColumns = (t: (arg: string) => string) => {
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
