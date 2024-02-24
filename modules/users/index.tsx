"use client";
import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";

export const UserModule = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	return (
		<CustomDataTable
			url="/users"
			lng={lng}
			columns={[
				{ accessor: "id", hidden: true },
				{ accessor: "office_id", hidden: true },
				{
					accessor: "full_name",
					title: t("full_name"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "office_name",
					title: t("office"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "email",
					title: t("email"),
					sortable: true,
				},
				{
					accessor: "username",
					title: t("username"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "status",
					title: t("status"),
					noWrap: true,
					sortable: true,
					render: ({ status }: { status: string }) =>
						status == "active"
							? t("active")
							: status == "inactive"
							? t("inactive")
							: status == "pending"
							? t("pending")
							: "",
				},
				{
					accessor: "created_at",
					title: t("created_at"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "created_by",
					title: t("created_by"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "updated_at",
					title: t("updated_at"),
					noWrap: true,
					sortable: true,
				},
				{
					accessor: "updated_by",
					title: t("updated_by"),
					noWrap: true,
					sortable: true,
				},
			]}
		/>
	);
};
