"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { applicantStatuses } from "@/shared/columns";
import { Genders, getType, StaffTypes, SurveyTypes } from "@/shared/constants";
import { getDateTime } from "@/shared/functions";
import {
	Avatar,
	Badge,
	Box,
	Button,
	Center,
	Flex,
	Group,
	Loader,
	LoadingOverlay,
	Menu,
	Paper,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import TeacherModal from "../../teachers/TeacherModal";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	CHANGE_STATUS,
	EDIT_APPLICANT_PACKAGE_IMPLEMENTS,
} from "@/shared/constants/Permissions";

const ApplicantInfo = ({
	applicantId,
	databaseID,
	lng,
	applicant,
	loading,
	mutate,
}: {
	applicantId: string | undefined;
	databaseID: number;
	lng: string;
	applicant: any;
	loading: boolean;
	mutate: any;
}) => {
	const { t } = useTranslation(lng);
	const types = SurveyTypes(t);
	const genders = Genders(t);
	const staffTypes = StaffTypes(t);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const statuses = applicantStatuses(t);
	const callApi = useAxios();
	const [statusLoading, setStatusLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const checkPermission = (permission: string) => {
		const hasPermission = permissionChecker(permission);
		return hasPermission && applicant?.status == "active";
	};

	const getStatus = (status: string) => {
		return statuses.find((item) => item.status == status);
	};

	const getMenu = (id: number, currentStatus: string) =>
		statuses.map((item, index) => (
			<Menu.Item
				key={index}
				onClick={() => changeStatus(id, currentStatus, item.status)}
			>
				{item.text}
			</Menu.Item>
		));

	const changeStatus = async (
		id: number,
		currentStatus: string,
		newStatus: string
	) => {
		if (currentStatus != newStatus) {
			setStatusLoading(true);
			const { status } = await callApi({
				method: "PUT",
				url: "applicants/" + id + "/status",
				data: {
					status: newStatus,
				},
			});
			if (status == 202) {
				mutate();
			} else {
				toast.error(t("something_went_wrong"));
			}
			setStatusLoading(false);
		}
	};

	const badge = (
		<Badge
			style={{ cursor: "pointer" }}
			color={getStatus(applicant?.status)?.color}
			rightSection={<GoChevronDown size={16} />}
			p="sm"
		>
			{statusLoading ? (
				<Center>
					<Loader size={20} color="white" />
				</Center>
			) : (
				<Text size="md" fw={500}>
					{getStatus(applicant?.status)?.text}
				</Text>
			)}
		</Badge>
	);

	return (
		<>
			<Paper withBorder shadow="sm" mb="md">
				<Flex
					justify={{ base: "center", xs: "space-between" }}
					align="center"
					className="applicant-title"
					p="md"
					gap="sm"
					wrap="wrap"
				>
					<Title order={3}>
						{applicant?.relevantable_type == "School"
							? t("teacher_info")
							: t("applicant_info")}
					</Title>
					{applicant?.profile && (
						<Center>
							<Avatar
								size={80}
								src={applicant?.profile}
								style={{ cursor: "pointer" }}
							/>
						</Center>
					)}
					<Group>
						{checkPermission(EDIT_APPLICANT_PACKAGE_IMPLEMENTS) && (
							<Button
								onClick={() => open()}
								rightSection={<TbEdit size={16} />}
							>
								{t("edit")}
							</Button>
						)}
						{permissionChecker(CHANGE_STATUS) ? (
							<Menu shadow="md" width={100}>
								<Menu.Target>{badge}</Menu.Target>
								<Menu.Dropdown>
									{getMenu(applicant?.id, applicant?.status)}
								</Menu.Dropdown>
							</Menu>
						) : (
							badge
						)}
					</Group>
				</Flex>
				<Box pos="relative" p="md">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>

					<Flex
						px="sm"
						direction={{ base: "column", sm: "row" }}
						gap="sm"
						pt="sm"
						justify="center"
						wrap="wrap"
					>
						<Group flex={1} wrap="nowrap" className="flex-item">
							<Text>{t("id")} :</Text>
							<Text>{applicantId}</Text>
						</Group>
						<Group flex={1} wrap="nowrap">
							<Text>{t("office")} :</Text>
							<Text>{applicant?.office?.name}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: "column", sm: "row" }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1} wrap="nowrap">
							<Text>{t("full_name")} :</Text>
							<Text>
								{applicant?.first_name} {applicant?.last_name}
							</Text>
						</Group>
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
						justify="center"
					>
						<Group flex={1} wrap="nowrap">
							<Text>{t("national_id")} :</Text>
							<Text>{applicant?.national_id}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("phone")} :</Text>
							<Text>{applicant?.phone}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: "column", sm: "row" }}
						gap="sm"
						pt="sm"
						justify="center"
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
						justify="center"
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
						justify="center"
					>
						<Group flex={1}>
							<Text>{t("staff_type")} :</Text>
							<Text>{getType(staffTypes, applicant?.staff_type)}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("gender")} :</Text>
							<Text>{getType(genders, applicant?.gender)}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: "column", sm: "row" }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1}>
							<Text>
								{applicant?.relevantable_type == "School"
									? t("school")
									: t("mosque")}
								:
							</Text>
							<Text>{applicant?.relevantable?.name}</Text>
						</Group>
						<Group flex={1}>
							<Text>{t("address")} :</Text>
							<Text>{applicant?.address}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: "column", sm: "row" }}
						gap="sm"
						pt="sm"
						justify="center"
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
						justify="center"
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
			{opened && (
				<TeacherModal
					opened={opened}
					close={close}
					lng={lng}
					mutate={mutate}
					title={t("update_teacher")}
					editId={databaseID}
				/>
			)}
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
