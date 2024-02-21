import {
	IconNotes,
	IconCalendarStats,
	IconGauge,
	IconPresentationAnalytics,
	IconFileAnalytics,
	IconAdjustments,
	IconLock,
} from "@tabler/icons-react";

export const navItems = (t: (arg: string) => string) => [
	{ label: t("dashboard"), icon: IconGauge, link: "/dashboard" },
	{
		label: t("covered_areas"),
		icon: IconNotes,
		initiallyOpened: true,
		links: [
			{ label: t("provinces"), link: "/covered_areas/provinces" },
			{ label: t("districts"), link: "/covered_areas/districts" },
			{ label: t("mosques"), link: "/covered_areas/mosques" },
		],
	},
	{
		label: "Releases",
		icon: IconCalendarStats,
		links: [
			{ label: "Upcoming releases", link: "/" },
			{ label: "Previous releases", link: "/" },
			{ label: "Releases schedule", link: "/" },
		],
	},
	{ label: "Analytics", icon: IconPresentationAnalytics },
	{ label: "Contracts", icon: IconFileAnalytics },
	{ label: "Settings", icon: IconAdjustments },
	{
		label: "Security",
		icon: IconLock,
		links: [
			{ label: "Enable 2FA", link: "/" },
			{ label: "Change password", link: "/" },
			{ label: "Recovery codes", link: "/" },
		],
	},
];
