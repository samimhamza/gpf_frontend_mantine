"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantPackageImplementColumns } from "@/shared/columns/applicant_package_implement.columns";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import {
	ADD_APPLICANT_PACKAGE_IMPLEMENTS,
	DELETE_APPLICANT_PACKAGE_IMPLEMENTS,
	EDIT_APPLICANT_PACKAGE_IMPLEMENTS,
} from "@/shared/constants/Permissions";
import ImplementModal from "./ImplementModal";
import CustomTableTitle from "@/components/CustomTableTitle";
import toast from "react-hot-toast";

const ApplicantPackageImplements = ({
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
	const columns = ApplicantPackageImplementColumns(t);
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();
	const [mutated, setMutated] = useState(false);
	const [edit, setEdit] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	const handleDelete = async (e: any) => {
		setDeleteLoading(true);
		const ids = selectedRecords.map((rec) => rec.id);
		const { status, error } = await callApi({
			method: "DELETE",
			url: "applicant_package_implements/1",
			data: { ids },
		});

		if (status == 204) {
			// await mutate();
			setSelectedRecords([]);
			toast.success(t("successfully_deleted"));
		}
		if (error) toast.error(t("something_went_wrong"));

		setDeleteLoading(false);
	};

	return (
		<>
			<CustomDataTable
				title={
					<CustomTableTitle
						title={t("implements_history")}
						showAdd={
							checkPermission(ADD_APPLICANT_PACKAGE_IMPLEMENTS) &&
							applicant?.surveys?.length
						}
						showDelete={
							checkPermission(DELETE_APPLICANT_PACKAGE_IMPLEMENTS) &&
							selectedRecords.length > 0
						}
						addLabel={t("aid_implement")}
						deleteLabel={t("delete")}
						deleteLoading={deleteLoading}
						handleDelete={handleDelete}
						openModal={open}
					/>
				}
				url={`/applicant_package_implements?applicant_id=${databaseID}`}
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
			{opened && (
				<ImplementModal
					applicantId={databaseID}
					officeId={applicant?.office_id}
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("aid_implement") : t("edit_aid_implement")}
					editId={edit}
				/>
			)}
		</>
	);
};

export default ApplicantPackageImplements;
