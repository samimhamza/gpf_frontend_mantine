"use client";

import { useTranslation } from "@/app/i18n/client";
import { Genders, getType, StaffTypes, SurveyTypes } from "@/shared/constants";
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
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";

const ApplicantInfo = ({
	lng,
	applicant,
	loading,
}: {
	lng: string;
	applicant: any;
	loading: boolean;
}) => {
	const { t } = useTranslation(lng);
	const types = SurveyTypes(t);
	const genders = Genders(t);
	const staffTypes = StaffTypes(t);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	return (
		<>
			<Paper withBorder shadow="sm" mb="md">
				<Center className="applicant-title" p="sm">
					<Title order={3}>{t("applicant_info")}</Title>
				</Center>
				<Box pos="relative" px="xl" p="md">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<Flex gap="sm" p="sm" justify="space-between" wrap="wrap">
						<Group style={{ flex: "1 1 100%", maxWidth: "100%" }}>
							<Text>{t("id")} :</Text>
							<Text>{applicant?.id}</Text>
						</Group>
						<Group style={{ flex: "1 1 100%", maxWidth: "100%" }}>
							<Text>{t("office")} :</Text>
							<Text>{applicant?.office?.name}</Text>
						</Group>
						<Group style={{ flex: "1 1 100%", maxWidth: "100%" }}>
							<Text>{t("full_name")} :</Text>
							<Text>
								{applicant?.first_name} {applicant?.last_name}
							</Text>
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
							<Text>{t("father_name")} :</Text>
							<Text>{applicant?.father_name}</Text>
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
							<Text>{t("main_residence")} :</Text>
							<Text>{applicant?.main_residence?.name_fa}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("current_residence")} :</Text>
							<Text>{applicant?.current_residence?.name_fa}</Text>
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
							<Text>{t("current_district")} :</Text>
							<Text>{applicant?.district?.name_fa}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("survey_type")} :</Text>
							<Text>{getType(types, applicant?.type)}</Text>
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
							<Text>{t("staff_type")} :</Text>
							<Text>{getType(staffTypes, applicant?.staff_type)}</Text>
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
							<Text>{applicant?.created_by?.username}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("updated_by")} :</Text>
							<Text>{applicant?.updated_by?.username}</Text>
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
							{applicant?.created_at && (
								<Text>{getDateTime(applicant?.created_at)}</Text>
							)}
						</Group>
						<Group flex={1}>
							<Text>{t("updated_at")} :</Text>
							{applicant?.updated_at && (
								<Text>{getDateTime(applicant?.updated_at)}</Text>
							)}
						</Group>
					</Flex>
				</Box>
			</Paper>

			{/* <Box my="sm">
				<DataTable
					height={250}
					withTableBorder
					withColumnBorders
					striped
					columns={columns}
					records={applicant?.items}
					groups={[
						{
							id: "title",
							title: t("surveys"),
							textAlign: "center",
							columns: columns,
						},
					]}
					fetching={loading}
					totalRecords={applicant?.items?.length}
					shadow="sm"
					loadingText={t("loading_data")}
					noRecordsText={t("no_records")}
					borderRadius="sm"
				/>
			</Box> */}
			<style jsx global>{`
				.applicant-title {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}

				@media (min-width: ${mdMatches}) {
					.flex-item {
						flex-basis: calc(50% - 6px);
					}
				}
				@media (max-width: ${mdMatches}) {
					.flex-item {
						flex-basis: calc(100% - 12px);
					}
				}
			`}</style>
		</>
	);
};

export default ApplicantInfo;
