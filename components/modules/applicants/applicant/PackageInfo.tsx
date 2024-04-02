"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Divider, Fieldset, Flex, Paper, Text } from "@mantine/core";

const PackageInfo = ({
	lng,
	category,
	charityPackage,
}: {
	lng: string;
	category?: any;
	charityPackage: any;
}) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Divider my="md" px="sm" />
			{category && (
				<Flex
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					p="sm"
					justify={{ sm: "center" }}
				>
					<Box style={{ flex: 1, cursor: "not-allowed" }}>
						<Text px="xs">{t("category")}</Text>
						<Paper withBorder py={5} px="sm">
							<Text fw="lighter">{category?.name}</Text>
						</Paper>
					</Box>
					<Box style={{ flex: 1, cursor: "not-allowed" }}>
						<Text px="xs">{t("charity_package")}</Text>
						<Paper withBorder py={5} px="sm">
							<Text fw="lighter">{charityPackage?.name}</Text>
						</Paper>
					</Box>
				</Flex>
			)}
			<Fieldset legend={t("package_items")} m="sm">
				<Flex gap="sm" pt="sm" wrap="wrap">
					{charityPackage?.cash_amount && (
						<Box
							style={{ cursor: "not-allowed" }}
							w={{ base: "100%", sm: "48%" }}
						>
							<Text px="xs">{t("cash_amount")}</Text>
							<Paper withBorder py={5} px="sm">
								<Text>
									{charityPackage?.cash_amount}{" "}
									{charityPackage?.currency == "USD"
										? t("usd")
										: charityPackage?.currency == "AFN"
										? t("afn")
										: ""}
								</Text>
							</Paper>
						</Box>
					)}
					{charityPackage?.items?.map((item: any, index: number) => (
						<Box
							key={index}
							style={{ cursor: "not-allowed" }}
							w={{ base: "100%", sm: "48%" }}
						>
							<Text px="xs">{t("item")}</Text>
							<Paper withBorder py={5} px="sm">
								<Text>
									{item.name} - {item.pivot.quantity.toString()}{" "}
									{item.pivot.unit}
								</Text>
							</Paper>
						</Box>
					))}
				</Flex>
			</Fieldset>
		</>
	);
};

export default PackageInfo;
