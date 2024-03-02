export const SchoolColumns = (t: (arg: string) => string, logs: Array<any>) => [
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
		accessor: "name",
		title: t("name"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "total_staff",
		title: t("total_staff"),
		sortable: true,
	},
	{
		accessor: "head_name",
		title: t("head_name"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "head_phone",
		title: t("head_phone"),
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
	{
		accessor: "type",
		title: t("school_type"),
		noWrap: true,
		sortable: true,
		render: ({ type }: { type: string }) =>
			type == "elementary"
				? t("elementary")
				: type == "intermediate"
				? t("intermediate")
				: type == "high_school" && t("high_school"),
	},
	{
		accessor: "province_name_fa",
		title: t("province"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "district_name_fa",
		title: t("district"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "address",
		title: t("address"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "village",
		title: t("village"),
		noWrap: true,
		sortable: true,
	},
	{
		accessor: "street",
		title: t("street"),
		noWrap: true,
		sortable: true,
	},
	...logs,
];
