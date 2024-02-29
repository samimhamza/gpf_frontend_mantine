export const UserColumns = (t: (arg: string) => string, logs: Array<any>) => [
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
				: status == "pending" && t("pending"),
	},
	...logs,
];
