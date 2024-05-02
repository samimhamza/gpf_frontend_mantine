"use client";

import { Center, Card, Flex, Stack, Text } from "@mantine/core";
import Image from "next/image";
import BackButton from "../BackButton";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonHref?: string;
	backButtonLabel?: string;
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
}: CardWrapperProps) => {
	return (
		<Flex align="center" justify="center" style={{ height: "100%" }}>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				style={{ width: "400px" }}
			>
				<Center>
					<Stack>
						<Image
							src="/images/logo_with_text.png"
							alt="logo"
							width={150}
							height={150}
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

export default CardWrapper;
