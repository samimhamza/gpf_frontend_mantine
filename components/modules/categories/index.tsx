"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { CategoryColumns } from "@/shared/columns/category.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import CategoryModal from "./CategoryModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_ITEMS,
	ADD_ITEMS,
	DELETE_ITEMS,
	CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const CategoryModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = CategoryColumns(
		t,
		permissionChecker(CHANGE_STATUS),
		"/categories/",
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
					{ title: t("categories") },
				]}
			/>
			<CustomDataTable
				title={t("categories")}
				url="/categories"
				deleteUrl="/categories/1"
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
				<CategoryModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_category") : t("update_category")}
					editId={edit}
				/>
			)}
		</>
	);
};
