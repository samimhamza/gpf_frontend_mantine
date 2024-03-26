"use client";

import { useTranslation } from "@/app/i18n/client";
import { ApplicantSurveyColumns } from "@/shared/columns/applicant_survey.columns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import {
	ADD_APPLICANT_SURVEYS,
	DELETE_APPLICANT_SURVEYS,
	EDIT_APPLICANT_SURVEYS,
} from "@/shared/constants/Permissions";
import ApplicantPackageModal from "./ApplicantPackageModal";

const ApplicantSurveys = ({
	lng,
	databaseID,
	applicant,
	checkPermission,
	mutate,
	setPackagesDelete,
}: {
	lng: string;
	databaseID: number;
	applicant: any;
	checkPermission: (permission: string) => boolean;
	mutate: any;
	setPackagesDelete: Dispatch<SetStateAction<boolean>>;
}) => {
	const { t } = useTranslation(lng);
	const columns = ApplicantSurveyColumns(t);
	const [opened, { open, close }] = useDisclosure();
	const [mutated, setMutated] = useState(false);
	const [edit, setEdit] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	const onDelete = async () => {
		await mutate();
		setPackagesDelete(true);
	};

	return (
		<>
			<CustomDataTable
				title={t("packages_history")}
				url={`/applicant_surveys?applicant_id=${databaseID}`}
				deleteUrl="/applicant_surveys/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={
					checkPermission(ADD_APPLICANT_SURVEYS) && !applicant?.surveys?.length
				}
				showDelete={checkPermission(DELETE_APPLICANT_SURVEYS)}
				showEdit={checkPermission(EDIT_APPLICANT_SURVEYS)}
				showView={false}
				height={300}
				showSecondTitle={true}
				secondTitleAddLabel={t("assign_package")}
				onDelete={onDelete}
			/>
			{opened && (
				<ApplicantPackageModal
					applicantId={databaseID}
					officeId={applicant?.office_id}
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
					mutate={mutate}
				/>
			)}
		</>
	);
};

export default ApplicantSurveys;
