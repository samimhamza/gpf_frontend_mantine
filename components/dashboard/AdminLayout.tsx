"use client";
import { useTranslation } from "@/app/i18n/client";
import {
	AppShell,
	Avatar,
	Burger,
	Flex,
	Group,
	ScrollArea,
	Box,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import { navItems } from "./NavItems";
import { userProps } from "@/types/next-auth";

const getNameAbbr = (name: string) => {
	var words = name.split(" ");
	var capitalizedLetters = "";
	for (var i = 0; i < words.length; i++) {
		capitalizedLetters += words[i].charAt(0).toUpperCase();
	}
	return capitalizedLetters;
};

export function AdminLayout({
	children,
	lng,
	user,
}: {
	children: React.ReactNode;
	lng: string;
	user: userProps;
}) {
	const [opened, { toggle }] = useDisclosure();
	const { t } = useTranslation(lng);
	const navList = navItems(t);
	const userNavList = navList.filter((item) => {
		if (
			(item.permission && user.permissions.includes(item.permission)) ||
			!item.permission
		)
			return item;
	});

	const links = userNavList.map((item) => (
		<LinksGroup
			{...item}
			key={item.label}
			user_permissions={user.permissions}
		/>
	));
	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Flex h="100%" px="md" align="center" justify="space-between">
					<Group>
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
						<Image
							src="/images/favicon.png"
							width={50}
							height={50}
							alt="logo"
						/>
						<Title order={3}>{t("gpf")}</Title>
					</Group>
					<Avatar radius="xl" color="cyan">
						{getNameAbbr(user.full_name)}
					</Avatar>
				</Flex>
			</AppShell.Header>
			<AppShell.Navbar p="xs">
				<AppShell.Section grow component={ScrollArea}>
					<Box my="md">{links}</Box>
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
