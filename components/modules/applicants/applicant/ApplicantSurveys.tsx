"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantSurveyColumns } from "@/shared/columns/applicant_survey.columns";
import { Button, Flex, Group, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	ADD_APPLICANT_SURVEYS,
	DELETE_APPLICANT_SURVEYS,
	EDIT_APPLICANT_SURVEYS,
} from "@/shared/constants/Permissions";
import ApplicantPackageModal from "./ApplicantPackageModal";

const ApplicantSurveys = ({
	lng,
	applicantId,
	applicant,
}: {
	lng: string;
	applicantId: number;
	applicant: any;
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

	const title = (
		<Flex
			justify={{ base: "center", sm: "space-between" }}
			align="center"
			p="sm"
			gap="sm"
			wrap="wrap"
		>
			<Title order={4}>{t("packages_history")}</Title>

			{applicant?.status == "active" && (
				<Group>
					{selectedRecords.length > 0 && (
						<Button
							loading={deleteLoading}
							onClick={handleDelete}
							color="red"
							rightSection={<MdDelete size={14} />}
						>
							{t("delete")}
						</Button>
					)}
					{
						<Button onClick={open} rightSection={<MdAdd size={14} />}>
							{t("assign_package")}
						</Button>
					}
				</Group>
			)}
		</Flex>
	);

	return (
		<>
			<CustomDataTable
				title={title}
				url={`/applicant_surveys?applicant_id=${applicantId}`}
				deleteUrl="/applicant_surveys/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={permissionChecker(ADD_APPLICANT_SURVEYS)}
				showDelete={permissionChecker(DELETE_APPLICANT_SURVEYS)}
				showEdit={permissionChecker(EDIT_APPLICANT_SURVEYS)}
				showView={false}
				height={300}
				showActionMenu={false}
				setRecords={setSelectedRecords}
			/>
			{opened && (
				<ApplicantPackageModal
					applicantId={applicantId}
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
							: t("assign_package_for_non_survey")
					}
					editId={edit}
				/>
			)}
		</>
	);
};

export default ApplicantSurveys;
