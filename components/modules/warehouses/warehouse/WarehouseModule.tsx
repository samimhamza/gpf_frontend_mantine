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
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import WarehouseItemsModal from "./WarehouseItemsModal";
import WarehouseInfo from "./WarehouseInfo";
import useSWR from "swr";

export const WarehouseModule = ({ lng, id }: { lng: string; id: number }) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const [mutated, setMutated] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const columns = WarehouseItemColumns(t);

	const { data, error, isLoading, mutate } = useSWR(
		`/warehouses/${id}`,
		async () => {
			const { response, error, status } = await callApi({
				method: "GET",
				url: `/warehouses/${id}`,
			});
			return response?.data;
		}
	);

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
					{ title: data ? data?.name : id.toString() },
				]}
			/>
			<WarehouseInfo lng={lng} warehouse={data} loading={isLoading} />
			<CustomDataTable
				title={t("warehouse_items_imports")}
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
				// orderBy={{
				// 	column: "store_date",
				// 	order: "desc",
				// }}
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
					mutate={mutate}
				/>
			)}
		</>
	);
};
