import { Center } from "@mantine/core";
import { logColumns } from ".";
import { getDateTime } from "../functions";

export const ApplicantPackageImplementColumns = (
	t: (arg: string) => string
) => {
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
			accessor: "implement_date",
			title: t("implement_date"),
			noWrap: true,
			sortable: true,
			render: ({ implement_date }: { implement_date: string }) =>
				implement_date ? getDateTime(implement_date) : "",
		},
		{
			accessor: "category_name",
			title: t("category"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "charity_package_name",
			title: t("charity_package"),
			noWrap: true,
			sortable: true,
		},
		...logs,
	];
};
