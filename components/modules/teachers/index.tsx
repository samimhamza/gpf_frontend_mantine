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
	CHANGE_STATUS,
} from "@/shared/constants/Permissions";
import AddPackageModal from "./AddPackageModal";
import ApplicantCard from "./ApplicantCard";

export const TeacherModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = TeacherColumns(
		t,
		permissionChecker(CHANGE_STATUS),
		"/applicants/",
		setMutated
	);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();
	const [addPackage, setAddPackage] = useState<number>();
	const [packageOpened, packageHandlers] = useDisclosure(false);
	const [printOrViewCard, setPrintOrViewCard] = useState<number>();
	const [cardOpened, cardHandlers] = useDisclosure(false);

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	useEffect(() => {
		if (addPackage) {
			packageHandlers.open();
		}
	}, [addPackage]);

	useEffect(() => {
		if (printOrViewCard) {
			cardHandlers.open();
		}
	}, [printOrViewCard]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{ title: t("teachers") },
				]}
			/>
			<CustomDataTable
				title={t("teachers")}
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
				showView={false}
				setAddPackage={setAddPackage}
				packageTitle={t("assign_package")}
				setPrintOrViewCard={setPrintOrViewCard}
			/>
			{opened && (
				<TeacherModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_teacher") : t("update_teacher")}
					editId={edit}
				/>
			)}
			{packageOpened && (
				<AddPackageModal
					applicantId={addPackage}
					opened={packageOpened}
					setMutated={setMutated}
					close={() => {
						packageHandlers.close();
						setAddPackage(undefined);
					}}
					lng={lng}
				/>
			)}
			{cardOpened && (
				<ApplicantCard
					opened={cardOpened}
					close={() => {
						cardHandlers.close();
						setPrintOrViewCard(undefined);
					}}
					lng={lng}
				/>
			)}
		</>
	);
};
