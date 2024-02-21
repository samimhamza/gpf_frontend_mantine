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

export function AdminLayout({
	children,
	lng,
}: {
	children: React.ReactNode;
	lng: string;
}) {
	const [opened, { toggle }] = useDisclosure();
	const { t } = useTranslation(lng);
	const navList = navItems(t);
	const links = navList.map((item) => (
		<LinksGroup {...item} key={item.label} />
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
					<Avatar radius="xl" color="cyan" />
				</Flex>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<AppShell.Section grow mb="md" component={ScrollArea}>
					<Box my="xl">{links}</Box>
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
