"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { logColumns } from "@/shared/columns";
import { UserColumns } from "@/shared/columns/user.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import UserModal from "./UserModal";
import { useState } from "react";

export const UserModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const logs = logColumns(t);
	const columns = UserColumns(t, logs);
	const [opened, { open, close }] = useDisclosure(false);
	const [mutated, setMutated] = useState(false);

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
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
			/>
			{opened && (
				<UserModal
					opened={opened}
					close={close}
					lng={lng}
					setMutated={setMutated}
				/>
			)}
		</>
	);
};
