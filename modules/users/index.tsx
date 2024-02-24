"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { logColumns } from "@/shared/columns";
import { UserColumns } from "@/shared/columns/user.columns";
import ActionMenu from "@/components/ActionMenu";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";

export const UserModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	const logs = logColumns(t);
	const columns = UserColumns(t, logs);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{ title: t("users") },
				]}
			/>
			<ActionMenu lng={lng} />
			<CustomDataTable url="/users" lng={lng} columns={columns} />
		</>
	);
};
