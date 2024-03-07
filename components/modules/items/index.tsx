"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { ItemColumns } from "@/shared/columns/item.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import ItemModal from "./ItemModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_ITEMS,
	ADD_ITEMS,
	DELETE_ITEMS,
} from "@/shared/constants/Permissions";

export const ItemModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = ItemColumns(t);
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
					{ title: t("items") },
				]}
			/>
			<CustomDataTable
				url="/items"
				deleteUrl="/items/1"
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
				<ItemModal
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
