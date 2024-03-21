"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantPackageImplementColumns } from "@/shared/columns/applicant_package_implement.columns";
import { Button, Flex, Group, Title } from "@mantine/core";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	ADD_APPLICANT_PACKAGE_IMPLEMENTS,
	DELETE_APPLICANT_PACKAGE_IMPLEMENTS,
	EDIT_APPLICANT_PACKAGE_IMPLEMENTS,
} from "@/shared/constants/Permissions";

const ApplicantPackageImplements = ({
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
	const columns = ApplicantPackageImplementColumns(t);
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();
	const [mutated, setMutated] = useState(false);
	const [edit, setEdit] = useState<number>();
	const checkPermission = (permission: string) => {
		const hasPermission = permissionChecker(permission);
		return hasPermission && applicant?.status == "active";
	};

	const handleDelete = () => {};

	const title = (
		<Flex
			justify={{ base: "center", sm: "space-between" }}
			align="center"
			p="sm"
			gap="sm"
			wrap="wrap"
		>
			<Title order={4}>{t("implements_history")}</Title>

			<Group>
				{checkPermission(DELETE_APPLICANT_PACKAGE_IMPLEMENTS) &&
					selectedRecords.length > 0 && (
						<Button
							loading={deleteLoading}
							onClick={handleDelete}
							color="red"
							rightSection={<MdDelete size={14} />}
						>
							{t("delete")}
						</Button>
					)}
				{checkPermission(ADD_APPLICANT_PACKAGE_IMPLEMENTS) && (
					<Button onClick={open} rightSection={<MdAdd size={14} />}>
						{t("implement")}
					</Button>
				)}
			</Group>
		</Flex>
	);

	return (
		<>
			<CustomDataTable
				title={title}
				url={`/applicant_package_implements?applicant_id=${applicantId}`}
				deleteUrl="/applicant_package_implements/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={checkPermission(ADD_APPLICANT_PACKAGE_IMPLEMENTS)}
				showDelete={checkPermission(DELETE_APPLICANT_PACKAGE_IMPLEMENTS)}
				showEdit={checkPermission(EDIT_APPLICANT_PACKAGE_IMPLEMENTS)}
				showView={false}
				height={300}
				showActionMenu={false}
				setRecords={setSelectedRecords}
			/>
		</>
	);
};

export default ApplicantPackageImplements;
