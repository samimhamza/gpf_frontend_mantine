import { Center } from "@mantine/core";
import { logColumns } from ".";

export const RoleColumns = (t: (arg: string) => string) => {
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
			accessor: "users_count",
			title: t("users_count"),
			noWrap: true,
			sortable: true,
			render: ({ users_count }: { users_count: number }) => (
				<Center>{users_count}</Center>
			),
		},
		{
			accessor: "permissions_count",
			title: t("permissions_count"),
			noWrap: true,
			sortable: true,
			render: ({ permissions_count }: { permissions_count: number }) => (
				<Center>{permissions_count}</Center>
			),
		},
		...logs,
	];
};
