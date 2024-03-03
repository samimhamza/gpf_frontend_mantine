import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";

export const MosqueColumns = (
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
		{
			status: "rejected",
			color: "red",
			text: t("rejected"),
		},
	];

	return [
		{ accessor: "id", hidden: true },
		{ accessor: "office_id", hidden: true },
		{ accessor: "province_id", hidden: true },
		{ accessor: "district_id", hidden: true },
		{
			accessor: "office_name",
			title: t("office"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "province_name",
			title: t("province"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "district_name",
			title: t("district"),
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
			accessor: "mosque_type",
			title: t("mosque_type"),
			sortable: true,
		},
		{
			accessor: "mosque_formal",
			title: t("mosque_formal"),
			noWrap: true,
			sortable: true,
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		...logs,
	];
};
