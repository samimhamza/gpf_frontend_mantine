import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";

export const SchoolColumns = (
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
		{
			accessor: "office_name",
			title: t("office"),
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
			accessor: "total_staff",
			title: t("total_staff"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "applicants_count",
			title: t("total_applicants"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "head_name",
			title: t("head_name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "head_phone",
			title: t("head_phone"),
			noWrap: true,
			sortable: true,
			cursor: "default",
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		{
			accessor: "type",
			title: t("school_type"),
			noWrap: true,
			sortable: true,
			render: ({ type }: { type: string }) =>
				type == "elementary"
					? t("elementary")
					: type == "intermediate"
					? t("intermediate")
					: type == "high_school" && t("high_school"),
		},
		{
			accessor: "province_name_fa",
			title: t("province"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "district_name_fa",
			title: t("district"),
			noWrap: true,
			sortable: true,
		},
		// {
		// 	accessor: "address",
		// 	title: t("address"),
		// 	noWrap: true,
		// 	sortable: true,
		// },
		...logs,
	];
};
