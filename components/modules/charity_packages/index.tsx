"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { CharityPackageColumns } from "@/shared/columns/charity_package.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import CharityPackageModal from "./CharityPackageModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	EDIT_CHARITY_PACKAGES,
	ADD_CHARITY_PACKAGES,
	DELETE_CHARITY_PACKAGES,
} from "@/shared/constants/Permissions";

export const CharityPackageModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = CharityPackageColumns(t);
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
					{ title: t("charity_packages") },
				]}
			/>
			<CustomDataTable
				url="/charity_packages"
				deleteUrl="/charity_packages/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={permissionChecker(ADD_CHARITY_PACKAGES)}
				showDelete={permissionChecker(DELETE_CHARITY_PACKAGES)}
				showEdit={permissionChecker(EDIT_CHARITY_PACKAGES)}
				showView={false}
			/>
			{opened && (
				<CharityPackageModal
					opened={opened}
					close={close}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("add_charity_package") : t("update_charity_package")}
					editId={edit}
				/>
			)}
		</>
	);
};
