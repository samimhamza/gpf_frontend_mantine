"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { WarehouseColumns } from "@/shared/columns/warehouse.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import WarehouseModal from "./WarehouseModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_WAREHOUSES,
	ADD_WAREHOUSES,
	DELETE_WAREHOUSES,
} from "@/shared/constants/Permissions";
import WarehouseItemsModal from "./WarehouseItemsModal";

export const WarehouseModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = WarehouseColumns(t);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();
	const [itemModalOPened, itemModalHandlers] = useDisclosure(false);
	const [addItem, setAddItem] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

	useEffect(() => {
		if (addItem) {
			itemModalHandlers.open();
		}
	}, [addItem]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{ title: t("warehouses") },
				]}
			/>
			<CustomDataTable
				url="/warehouses"
				deleteUrl="/warehouses/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={permissionChecker(ADD_WAREHOUSES)}
				showDelete={permissionChecker(DELETE_WAREHOUSES)}
				showEdit={permissionChecker(EDIT_WAREHOUSES)}
				showView={false}
				setAddItem={setAddItem}
				addItemTitle={t("add_item_to_inventory")}
			/>
			{opened && (
				<WarehouseModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_warehouse") : t("update_warehouse")}
					editId={edit}
				/>
			)}
			{itemModalOPened && (
				<WarehouseItemsModal
					opened={itemModalOPened}
					close={() => {
						itemModalHandlers.close();
						setAddItem(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={t("add_item_to_warehouse")}
					warehouseId={addItem}
				/>
			)}
		</>
	);
};
