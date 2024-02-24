import { getDateTime } from "@/shared/functions";

export const logColumns = (t: (arg: string) => string) => {
	return [
		{
			accessor: "created_at",
			title: t("created_at"),
			noWrap: true,
			sortable: true,
			render: ({ created_at }: { created_at: string }) =>
				getDateTime(created_at),
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
			render: ({ updated_at }: { updated_at: string }) =>
				getDateTime(updated_at),
		},
		{
			accessor: "updated_by",
			title: t("updated_by"),
			noWrap: true,
			sortable: true,
		},
	];
};
