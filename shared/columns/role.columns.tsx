import { logColumns } from ".";

export const RoleColumns = (t: (arg: string) => string) => {
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
			accessor: "users_count",
			title: t("users_count"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "permissions_count",
			title: t("permissions_count"),
			noWrap: true,
			sortable: true,
		},
		...logs,
	];
};
