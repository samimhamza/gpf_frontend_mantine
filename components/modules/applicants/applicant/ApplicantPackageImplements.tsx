"use client";

import { useTranslation } from "@/app/i18n/client";
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

const ApplicantPackageImplements = ({
	lng,
	databaseID,
	applicant,
	checkPermission,
	mutate,
	packagesDeleted,
}: {
	lng: string;
	databaseID: number;
	applicant: any;
	checkPermission: (permission: string) => boolean;
	mutate: any;
	packagesDeleted: boolean;
}) => {
	const { t } = useTranslation(lng);
	const columns = ApplicantPackageImplementColumns(t);
	const [opened, { open, close }] = useDisclosure();
	const [mutated, setMutated] = useState(false);
	const [edit, setEdit] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	useEffect(() => {
		if (packagesDeleted) {
			setMutated(true);
		}
	}, [packagesDeleted]);

	const isImplementAvailable = () => {
		return (
			applicant?.surveys[0]?.implements_count <
			applicant?.surveys[0]?.charity_package?.period
		);
	};

	return (
		<>
			<CustomDataTable
				title={t("implements_history")}
				url={`/applicant_package_implements?applicant_id=${databaseID}`}
				deleteUrl="/applicant_package_implements/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={
					checkPermission(ADD_APPLICANT_PACKAGE_IMPLEMENTS) &&
					isImplementAvailable()
				}
				showDelete={checkPermission(DELETE_APPLICANT_PACKAGE_IMPLEMENTS)}
				showEdit={checkPermission(EDIT_APPLICANT_PACKAGE_IMPLEMENTS)}
				showView={false}
				height={300}
				showSecondTitle={true}
				secondTitleAddLabel={t("aid_implement")}
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
					mutate={mutate}
					title={!edit ? t("aid_implement") : t("edit_aid_implement")}
					editId={edit}
				/>
			)}
		</>
	);
};

export default ApplicantPackageImplements;
