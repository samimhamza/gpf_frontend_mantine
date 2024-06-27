import { Center } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";

export const ReferencesColumns = (
	t: (arg: string) => string,
	showStatus: boolean,
	statusUrl: string,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	const logs = logColumns(t);

	const statuses = [
		{
			status: "active",
			color: "green",
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
			accessor: "office_code",
			title: t("office"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "username",
			title: t("user"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "first_name",
			title: t("first_name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "father_name",
			title: t("father_name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "last_name",
			title: t("last_name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "job_location",
			title: t("job_location"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "position",
			title: t("job_position"),
			noWrap: true,
			sortable: true,
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		...logs,
	];
};
