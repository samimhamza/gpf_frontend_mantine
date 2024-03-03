"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { logColumns } from "@/shared/columns";
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
} from "@/shared/constants/Permissions";

export const UserModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const logs = logColumns(t);
	const columns = UserColumns(t, logs);
	const [opened, { open, close }] = useDisclosure(false);
	const [mutated, setMutated] = useState(false);
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
					close={close}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("create_user") : t("update_user")}
					editId={edit}
				/>
			)}
		</>
	);
};
