"use client";

import { useTranslation } from "@/app/i18n/client";
import { getDateTime } from "@/shared/functions";
import {
	Box,
	Center,
	Flex,
	Group,
	LoadingOverlay,
	Paper,
	Text,
	Title,
} from "@mantine/core";

const WarehouseInfo = ({
	lng,
	warehouse,
	loading,
}: {
	lng: string;
	warehouse: any;
	loading: boolean;
}) => {
	const { t } = useTranslation(lng);

	return (
		<Paper p="md" withBorder shadow="sm" mb="md">
			<Center>
				<Title order={3}>{t("warehouse_info")}</Title>
			</Center>
			<Box pos="relative">
				<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				<Flex
					px="sm"
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					pt="lg"
					justify={"center"}
				>
					<Group flex={1}>
						<Text>{t("id")} :</Text>
						<Text>{warehouse?.id}</Text>
					</Group>
					<Group flex={1}>
						<Text>{t("name")} :</Text>
						<Text>{warehouse?.name}</Text>
					</Group>
				</Flex>
				<Flex
					px="sm"
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					pt="sm"
					justify={"center"}
				>
					<Group flex={1}>
						<Text>{t("office")} :</Text>
						<Text>{warehouse?.office?.name}</Text>
					</Group>
					<Group flex={1}>
						<Text>{t("province")} :</Text>
						<Text>{warehouse?.province?.name_fa}</Text>
					</Group>
				</Flex>
				<Flex
					px="sm"
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					pt="sm"
					justify={"center"}
				>
					<Group flex={1}>
						<Text>{t("created_by")} :</Text>
						<Text>{warehouse?.created_by?.username}</Text>
					</Group>
					<Group flex={1}>
						<Text>{t("updated_by")} :</Text>
						<Text>{warehouse?.updated_by?.username}</Text>
					</Group>
				</Flex>
				<Flex
					px="sm"
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					pt="sm"
					justify={"center"}
				>
					<Group flex={1}>
						<Text>{t("created_at")} :</Text>
						{warehouse?.created_at && (
							<Text>{getDateTime(warehouse?.created_at)}</Text>
						)}
					</Group>
					<Group flex={1}>
						<Text>{t("updated_at")} :</Text>
						{warehouse?.updated_at && (
							<Text>{getDateTime(warehouse?.updated_at)}</Text>
						)}
					</Group>
				</Flex>
			</Box>
		</Paper>
	);
};

export default WarehouseInfo;
