"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { TeacherColumns } from "@/shared/columns/teacher.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import TeacherModal from "./TeacherModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_APPLICANTS,
	ADD_APPLICANTS,
	DELETE_APPLICANTS,
} from "@/shared/constants/Permissions";

export const TeacherModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = TeacherColumns(t);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	useEffect(() => {
		if (!opened) {
			setEdit(undefined);
		}
	}, [opened]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{ title: t("teachers") },
				]}
			/>
			<CustomDataTable
				url="/teachers"
				deleteUrl="/teachers/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={permissionChecker(ADD_APPLICANTS)}
				showDelete={permissionChecker(DELETE_APPLICANTS)}
				showEdit={permissionChecker(EDIT_APPLICANTS)}
			/>
			{opened && (
				<TeacherModal
					opened={opened}
					close={close}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_teacher") : t("update_teacher")}
					editId={edit}
				/>
			)}
		</>
	);
};
