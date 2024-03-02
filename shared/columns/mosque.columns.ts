export const MosqueColumns = (t: (arg: string) => string, logs: Array<any>) => [
	{ accessor: "id", hidden: true },
	{ accessor: "office_id", hidden: true },
	{ accessor: "province_id", hidden: true },
	{ accessor: "district_id", hidden: true },
	{
		accessor: "office_name",
		title: t("office"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "province_name",
		title: t("province"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "district_name",
		title: t("district"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "name",
		title: t("name"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "mosque_type",
		title: t("mosque_type"),
		sortable: true,
	},
	{
		accessor: "mosque_formal",
		title: t("mosque_formal"),
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
				: status == "rejected" && t("rejected"),
	},
	...logs,
];
