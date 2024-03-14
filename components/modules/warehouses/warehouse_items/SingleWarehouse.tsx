"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import { useAxios } from "@/customHooks/useAxios";
import { WarehouseItemColumns } from "@/shared/columns/warehouse_item.columns";
import {
	ADD_WAREHOUSES,
	DELETE_WAREHOUSES,
	EDIT_WAREHOUSES,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { Group, LoadingOverlay, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WarehouseItemsModal from "./WarehouseItemsModal";

export const SingleWarehouse = ({ lng, id }: { lng: string; id: number }) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [warehouse, setWarehouse] = useState({});
	const [mutated, setMutated] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const columns = WarehouseItemColumns(t);

	useEffect(() => {
		(async function () {
			setLoading(true);
			const { response, status, error } = await callApi({
				method: "GET",
				url: `/warehouses/${id}`,
			});
			if (status == 200 && response.result == true) {
				setWarehouse(response.data);
			} else {
				toast.error("something_went_wrong");
				router.push("/warehouses");
			}
			setLoading(false);
		})();
	}, []);

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
					{ title: t("warehouses"), link: "/warehouses" },
					{ title: id.toString() },
				]}
			/>
			<Paper p="md" withBorder shadow="sm" mb="md" pos="relative">
				<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				<Group justify="space-between" align="center"></Group>
			</Paper>
			<CustomDataTable
				title={t("warehouse_items")}
				url={`/warehouse_items?warehouse_id=${id}`}
				deleteUrl="/warehouse_items/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={permissionChecker(ADD_WAREHOUSES)}
				showDelete={permissionChecker(DELETE_WAREHOUSES)}
				showEdit={permissionChecker(EDIT_WAREHOUSES)}
				height={350}
			/>
			{opened && (
				<WarehouseItemsModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={
						!edit ? t("add_item_to_warehouse") : t("update_item_to_warehouse")
					}
					warehouseId={id}
					editId={edit}
				/>
			)}
		</>
	);
};
