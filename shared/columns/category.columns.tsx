import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";

export const CategoryColumns = (
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
		},
		{
			accessor: "name",
			title: t("name"),
			noWrap: true,
			sortable: true,
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		...logs,
	];
};
