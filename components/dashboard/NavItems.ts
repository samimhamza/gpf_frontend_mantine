import {
	VIEW_APPLICANTS,
	VIEW_CATEGORIES,
	VIEW_CHARITY_PACKAGES,
	VIEW_ITEMS,
	VIEW_MOSQUES,
	VIEW_SCHOOLS,
	VIEW_USERS,
} from "@/shared/constants/Permissions";
import { FaUsers } from "react-icons/fa6";
import { TbGauge } from "react-icons/tb";
import { MdMosque } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidBox } from "react-icons/bi";

export const navItems = (t: (arg: string) => string) => [
	{ label: t("dashboard"), icon: TbGauge, link: "/dashboard" },
	{
		label: t("covered_areas"),
		icon: MdMosque,
		initiallyOpened: true,
		permission: VIEW_MOSQUES,
		links: [
			{
				label: t("schools"),
				link: "/covered_areas/schools",
				permission: VIEW_SCHOOLS,
			},
			{
				label: t("mosques"),
				link: "/covered_areas/mosques",
				permission: VIEW_MOSQUES,
			},
		],
	},
	{
		label: t("applicants"),
		icon: FaUserGroup,
		initiallyOpened: true,
		permission: VIEW_APPLICANTS,
		links: [
			{
				label: t("teachers"),
				link: "/teachers",
				permission: VIEW_APPLICANTS,
			},
		],
	},
	{
		label: t("inventory"),
		icon: BiSolidBox,
		initiallyOpened: true,
		permission: VIEW_APPLICANTS,
		links: [
			{
				label: t("items"),
				link: "/items",
				permission: VIEW_ITEMS,
			},
			{
				label: t("categories"),
				link: "/categories",
				permission: VIEW_CATEGORIES,
			},
			{
				label: t("charity_packages"),
				link: "/charity_packages",
				permission: VIEW_CHARITY_PACKAGES,
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
