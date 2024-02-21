"use client";

import { Center, Card, Flex, Stack, Text } from "@mantine/core";
import { BackButton } from "./BackButton";
import classes from "./CardWrapper.module.css";
import Image from "next/image";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonHref?: string;
	backButtonLabel?: string;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
}: CardWrapperProps) => {
	return (
		<Flex align="center" justify="center" className={classes.flex}>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				className={classes.card}
			>
				<Center>
					<Stack>
						<Image
							src="/images/favicon.png"
							alt="logo"
							width="112"
							height="112"
						/>
						<Text ta="center" fw="bold">
							{headerLabel}
						</Text>
					</Stack>
				</Center>
				{children}
				{backButtonHref && backButtonLabel && (
					<BackButton label={backButtonLabel} href={backButtonHref} />
				)}
			</Card>
		</Flex>
	);
};
