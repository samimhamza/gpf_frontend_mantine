import { Avatar, Center } from "@mantine/core";
import { applicantStatuses, logColumns } from ".";
import { statusColum } from "./statusColum";
import { Dispatch, SetStateAction } from "react";

export const TeacherColumns = (
	t: (arg: string) => string,
	showStatus: boolean,
	statusUrl: string,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	const logs = logColumns(t);
	const statuses = applicantStatuses(t);

	return [
		{
			accessor: "id",
			title: t("id"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "school_name",
			title: t("school_name"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "profile",
			title: t("profile"),
			noWrap: true,
			sortable: true,
			render: ({ profile }: { profile: string }) => (
				<Center>
					<Avatar src={profile} alt="profile" size={35} />
				</Center>
			),
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
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		{
			accessor: "staff_type",
			title: t("staff_type"),
			noWrap: true,
			sortable: true,
			render: ({ staff_type }: { staff_type: string }) =>
				staff_type == "informal_teacher"
					? t("informal_teacher")
					: staff_type == "formal_teacher"
					? t("formal_teacher")
					: staff_type == "school_employee"
					? t("school_employee")
					: "",
		},
		{
			accessor: "type",
			title: t("survey_type"),
			noWrap: true,
			sortable: true,
			render: ({ type }: { type: string }) =>
				type == "survey"
					? t("survey")
					: type == "without_survey"
					? t("without_survey")
					: "",
		},
		{
			accessor: "phone",
			title: t("phone"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "national_id",
			title: t("national_id"),
			noWrap: true,
			sortable: true,
			cursor: "default",
		},
		{
			accessor: "main_residence_fa",
			title: t("main_residence"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "current_residence_fa",
			title: t("current_residence"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "district_fa",
			title: t("district"),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "gender",
			title: t("gender"),
			noWrap: true,
			sortable: true,
			render: ({ gender }: { gender: string }) =>
				gender == "male" ? t("male") : gender == "female" ? t("female") : "",
		},
		...logs,
	];
};
