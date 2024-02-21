"use client";
import { AppShell, Burger, Group, ScrollArea, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function AdminLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<AppShell.Section grow mb="md" component={ScrollArea}>
					{Array(30)
						.fill(0)
						.map((_, index) => (
							<Skeleton key={index} h={28} mt="sm" animate={false} />
						))}
				</AppShell.Section>
				<AppShell.Section>
					Navbar footer – always at the bottom
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>
				Alt layout – Navbar and Aside are rendered on top on Header and Footer
			</AppShell.Main>
		</AppShell>
	);
}
