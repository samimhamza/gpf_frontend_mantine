"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { OfficeColumns } from "@/shared/columns/office.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import OfficeModal from "./OfficeModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_ITEMS,
	ADD_ITEMS,
	DELETE_ITEMS,
	CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const OfficeModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = OfficeColumns(
		t,
		permissionChecker(CHANGE_STATUS),
		"/offices/",
		setMutated
	);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{ title: t("offices") },
				]}
			/>
			<CustomDataTable
				title={t("offices")}
				url="/offices"
				deleteUrl="/offices/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={permissionChecker(ADD_ITEMS)}
				showDelete={permissionChecker(DELETE_ITEMS)}
				showEdit={permissionChecker(EDIT_ITEMS)}
				showView={false}
			/>
			{opened && (
				<OfficeModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_office") : t("update_office")}
					editId={edit}
				/>
			)}
		</>
	);
};
