"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantSurveyColumns } from "@/shared/columns/applicant_survey.columns";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import {
	ADD_APPLICANT_SURVEYS,
	DELETE_APPLICANT_SURVEYS,
	EDIT_APPLICANT_SURVEYS,
} from "@/shared/constants/Permissions";
import ApplicantPackageModal from "./ApplicantPackageModal";
import CustomTableTitle from "@/components/CustomTableTitle";

const ApplicantSurveys = ({
	lng,
	databaseID,
	applicant,
	checkPermission,
}: {
	lng: string;
	databaseID: number;
	applicant: any;
	checkPermission: (permission: string) => boolean;
}) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const columns = ApplicantSurveyColumns(t);
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();
	const [mutated, setMutated] = useState(false);
	const [edit, setEdit] = useState<number>();

	const handleDelete = () => {};

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	return (
		<>
			<CustomDataTable
				title={
					<CustomTableTitle
						title={t("packages_history")}
						showAdd={
							checkPermission(ADD_APPLICANT_SURVEYS) &&
							!applicant?.surveys?.length
						}
						showDelete={
							checkPermission(DELETE_APPLICANT_SURVEYS) &&
							selectedRecords.length > 0
						}
						addLabel={t("assign_package")}
						deleteLabel={t("delete")}
						deleteLoading={deleteLoading}
						handleDelete={handleDelete}
						openModal={open}
					/>
				}
				url={`/applicant_surveys?applicant_id=${databaseID}`}
				deleteUrl="/applicant_surveys/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={checkPermission(ADD_APPLICANT_SURVEYS)}
				showDelete={checkPermission(DELETE_APPLICANT_SURVEYS)}
				showEdit={checkPermission(EDIT_APPLICANT_SURVEYS)}
				showView={false}
				height={300}
				showActionMenu={false}
				setRecords={setSelectedRecords}
			/>
			{opened && (
				<ApplicantPackageModal
					applicantId={databaseID}
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={
						!edit
							? t("assign_package_for_non_survey")
							: t("edit_package_for_non_survey")
					}
					editId={edit}
				/>
			)}
		</>
	);
};

export default ApplicantSurveys;
