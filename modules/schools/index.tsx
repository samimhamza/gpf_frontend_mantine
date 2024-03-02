"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { logColumns } from "@/shared/columns";
import { SchoolColumns } from "@/shared/columns/school.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import SchoolModal from "./SchoolModal";
import { useEffect, useState } from "react";

export const SchoolModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const logs = logColumns(t);
	const columns = SchoolColumns(t, logs);
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
					{ title: t("schools") },
				]}
			/>
			<CustomDataTable
				url="/schools"
				deleteUrl="/schools/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
			/>
			{opened && (
				<SchoolModal
					opened={opened}
					close={close}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t("create_school") : t("update_school")}
					editId={edit}
				/>
			)}
		</>
	);
};
