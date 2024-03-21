"use client";

import { useLayoutEffect, useState } from "react";
import {
	Group,
	Box,
	Collapse,
	ThemeIcon,
	Text,
	UnstyledButton,
	rem,
} from "@mantine/core";
import { GoChevronLeft } from "react-icons/go";
import classes from "./NavbarLinksGroup.module.css";
import { usePathname, useRouter } from "next/navigation";

interface LinksGroupProps {
	icon: React.FC<any>;
	label: string;
	link?: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string; permission?: string }[];
	user_permissions: Array<string>;
}

export function LinksGroup({
	icon: Icon,
	label,
	link,
	initiallyOpened,
	links,
	user_permissions,
}: LinksGroupProps) {
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const [active, setActive] = useState("");
	const router = useRouter();
	const pathname = usePathname();

	// useLayoutEffect(() => {
	// 	if (hasLinks) {
	// 		links.forEach((link) => {
	// 			if (pathname?.includes(link.link)) {
	// 				setActive(link.link);
	// 			}
	// 		});
	// 	} else if (link && pathname?.includes(link)) {
	// 		setActive(link);
	// 	}
	// }, [pathname]);

	const userNavList = (hasLinks ? links : []).filter((link) => {
		if (
			(link.permission && user_permissions.includes(link.permission)) ||
			!link.permission
		)
			return link;
	});
	const items = userNavList.map((link) => (
		<Text
			className={`${classes.link} ${link.link == active ? classes.active : ""}`}
			key={link.label}
			onClick={() => router.push(link.link)}
		>
			{link.label}
		</Text>
	));

	return (
		<>
			<UnstyledButton
				onClick={() => (!link ? setOpened((o) => !o) : router.push(link))}
				className={`${classes.control} ${link == active ? classes.active : ""}`}
			>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box mr="md">{label}</Box>
					</Box>
					{hasLinks && (
						<GoChevronLeft
							className={classes.chevron}
							stroke="1.5"
							style={{
								width: rem(16),
								height: rem(16),
								transform: opened ? "rotate(-90deg)" : "none",
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks && <Collapse in={opened}>{items}</Collapse>}
		</>
	);
}
