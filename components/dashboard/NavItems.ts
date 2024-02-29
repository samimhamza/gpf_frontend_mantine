import { VIEW_MOSQUES, VIEW_USERS } from "@/shared/constants/Permissions";
import { FaUsers } from "react-icons/fa6";
import { TbGauge } from "react-icons/tb";
import { MdMosque } from "react-icons/md";

export const navItems = (t: (arg: string) => string) => [
	{ label: t("dashboard"), icon: TbGauge, link: "/dashboard" },
	{
		label: t("covered_areas"),
		icon: MdMosque,
		initiallyOpened: true,
		permission: VIEW_MOSQUES,
		links: [
			{
				label: t("provinces"),
				link: "/covered_areas/provinces",
				permission: VIEW_MOSQUES,
			},
			{
				label: t("districts"),
				link: "/covered_areas/districts",
				permission: VIEW_MOSQUES,
			},
			{
				label: t("mosques"),
				link: "/covered_areas/mosques",
				permission: VIEW_MOSQUES,
			},
		],
	},
	{
		label: t("users"),
		icon: FaUsers,
		link: "/users",
		permission: VIEW_USERS,
	},
];
