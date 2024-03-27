import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";
import { Center } from "@mantine/core";

export const UserColumns = (
	t: (arg: string) => string,
	showStatus: boolean,
	statusUrl: string,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	const logs = logColumns(t);

	const statuses = [
		{
			status: "active",
			color: "teal",
			text: t("active"),
		},
		{
			status: "inactive",
			color: "gray",
			text: t("inactive"),
		},
		{
			status: "pending",
			color: "yellow",
			text: t("pending"),
		},
	];

	return [
		{
			accessor: "id",
			title: t("id"),
			noWrap: true,
			sortable: true,
			render: ({ id }: { id: number }) => <Center>{id}</Center>,
		},
		{
			accessor: "full_name",
			title: t("full_name"),
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
			accessor: "email",
			title: t("email"),
			sortable: true,
		},
		{
			accessor: "username",
			title: t("username"),
			noWrap: true,
			sortable: true,
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		...logs,
	];
};
