"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { UserColumns } from "@/shared/columns/user.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import UserModal from "./UserModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	ADD_USERS,
	DELETE_USERS,
	EDIT_USERS,
	CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const UserModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = UserColumns(
		t,
		permissionChecker(CHANGE_STATUS),
		"/users/",
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
					{ title: t("users") },
				]}
			/>
			<CustomDataTable
				url="/users"
				deleteUrl="/users/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={permissionChecker(ADD_USERS)}
				showDelete={permissionChecker(DELETE_USERS)}
				showEdit={permissionChecker(EDIT_USERS)}
			/>
			{opened && (
				<UserModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_user") : t("update_user")}
					editId={edit}
				/>
			)}
		</>
	);
};
