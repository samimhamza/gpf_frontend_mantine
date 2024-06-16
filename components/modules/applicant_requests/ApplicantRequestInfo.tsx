'use client';

import { useTranslation } from '@/app/i18n/client';
import { useAxios } from '@/customHooks/useAxios';
import { applicantRequestStatuses } from '@/shared/columns';
import { getDateTime } from '@/shared/functions';
import { TbEdit } from 'react-icons/tb';
import { CHANGE_STATUS, UPDATE_TEAMS } from '@/shared/constants/Permissions';
import toast from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";

import {
	Box,
	Button,
	Badge,
	Loader, Center,
	Flex,
	Menu,
	Group,
	LoadingOverlay,
	Paper,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { permissionChecker } from '@/shared/functions/permissionChecker';
import ApplicantRequestModal from './ApplicantRequestModal';
import ApplicantRequestDecisionModal from './ApplicantRequestDecisionModal';
const ApplicantRequestInfo = ({
	applicantRequestId,
	databaseID,
	lng,
	data,
	loading,
	mutate,
}: {
	applicantRequestId: string | undefined;
	databaseID: number;
	lng: string;
	data: any;
	loading: boolean;
	mutate: any;
}) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const statuses = applicantRequestStatuses(t);
	const callApi = useAxios();
	const [statusLoading, setStatusLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
    const [isCreateDecisionOpened, { open: openCreateDecision, close: closeCreateDecision }] = useDisclosure(false);
	const [selectedStatus, setSelectedStatus] = useState('');
	const [generalApplicantRequestId, setGeneralApplicantRequestId] = useState(undefined);

	const checkPermission = (permission: string) => {
		const hasPermission = permissionChecker(permission);
		return hasPermission && data?.status == 'active';
	};


	const getStatus = (status: string) => {
		return statuses.find((item) => item.status == status);
	  };
	
	  const getMenu = () =>
		statuses.map((item, index) => (
		  <Menu.Item
			key={index}
			onClick={() => handleCreateDecision(item.status)}
		  >
			{item.text}
		  </Menu.Item>
		));

		const handleCreateDecision = (status: string) =>{
			setSelectedStatus(status);
			setGeneralApplicantRequestId(data?.id)
			openCreateDecision();
		}

	  const badge = (
		<Badge
		  style={{ cursor: "pointer" }}
		  color={getStatus(data?.status)?.color}
		  rightSection={<GoChevronDown size={16} />}
		  p="sm"
		>
		  {statusLoading ? (
			<Center>
			  <Loader size={20} color="white" />
			</Center>
		  ) : (
			<Text size="md" fw={500}>
			  {getStatus(data?.status)?.text}
			</Text>
		  )}
		</Badge>
	  );

	return (
		<>
			<Paper withBorder shadow="sm" mb="md">
				<Flex
					justify={{ base: 'center', xs: 'space-between' }}
					align="center"
					className="applicant-title"
					p="md"
					gap="sm"
					wrap="wrap"
				>
					<Title order={3}>{t('applicant_request_info')}</Title>
					<Group>
						{permissionChecker(CHANGE_STATUS) ? (
							<Menu shadow="md" width={100}>
								<Menu.Target>{badge}</Menu.Target>
								<Menu.Dropdown>
									{getMenu()}
								</Menu.Dropdown>
							</Menu>
						) : (
							badge
						)}
						{2 > 1 && (
							<Button
								onClick={() => open()}
								rightSection={<TbEdit size={16} />}
							>
								{t('edit')}
							</Button>
						)}
					</Group>
				</Flex>
				<Box pos="relative" p="md">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
						wrap="wrap"
					>
						<Group flex={1} wrap="nowrap" className="flex-item">
							<Text className="title">{t('id')} :</Text>
							<Text>{applicantRequestId}</Text>
						</Group>
						<Group flex={1} wrap="nowrap">
							<Text className="title">
								{t('applicant_name')} :
							</Text>
							<Text>{data?.general_applicant?.name}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1} wrap="nowrap">
							<Text className="title">{t('request')} :</Text>
							<Text>{data?.request}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('priority')} :</Text>
							<Text>{t(data?.priority)}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1} wrap="nowrap">
							<Text className="title">{t('status')} :</Text>
							<Text>{t(data?.status)}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('descriptions')} :</Text>
							<Text>{data?.descriptions}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1}>
							<Text className="title">{t('created_by')} :</Text>
							<Text>{data?.created_by?.username}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('updated_by')} :</Text>
							<Text>{data?.updated_by?.username}</Text>
						</Group>
					</Flex>
					<Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1}>
							<Text className="title">{t('created_at')} :</Text>
							{data?.created_at && (
								<Text>{getDateTime(data?.created_at)}</Text>
							)}
						</Group>
						<Group flex={1}>
							<Text className="title">{t('updated_at')} :</Text>
							{data?.updated_at && (
								<Text>{getDateTime(data?.updated_at)}</Text>
							)}
						</Group>
					</Flex>
				</Box>
			</Paper>

			<Paper withBorder shadow="sm" mb="md" pb="lg">
				<Title order={3} p="sm" className="applicant-title" ta="center">
					{t('decision')}
				</Title>

				<Flex
					px="sm"
					direction={{ base: 'column', sm: 'row' }}
					gap="sm"
					pt="sm"
					justify="center"
				>
					<Group flex={1}>
						<Text className="title">{t('decided_by')} :</Text>
						<Text>{data?.decision?.user?.username}</Text>
					</Group>
					<Group flex={1}>
						<Text className="title">{t('decided_at')} :</Text>
						{data?.decision && (
							<Text>
								{getDateTime(data?.decision?.decided_at)}
							</Text>
						)}
					</Group>
				</Flex>
				<Flex
					px="sm"
					direction={{ base: 'column', sm: 'row' }}
					gap="sm"
					pt="sm"
					justify="center"
				>
					<Group flex={1}>
						<Text className="title">{t('reason')} :</Text>
						<Text>{data?.decision?.reason}</Text>
					</Group>
					<Group flex={1}>
						<Text className="title">{t('created_at')} :</Text>
						{data?.decision && (
							<Text>
								{getDateTime(data?.decision?.created_at)}
							</Text>
						)}
					</Group>
				</Flex>
				<Flex
					px="sm"
					direction={{ base: 'column', sm: 'row' }}
					gap="sm"
					pt="sm"
					justify="center"
				>
					<Group flex={1}>
						<Text className="title">{t('updated_at')} :</Text>
						{data?.decision && (
							<Text>
								{getDateTime(data?.decision?.updated_at)}
							</Text>
						)}
					</Group>
				</Flex>
			</Paper>
			{isCreateDecisionOpened && (
				<ApplicantRequestDecisionModal
					opened={isCreateDecisionOpened}
					close={() => {
						closeCreateDecision();
					}}
					lng={lng}
					setMutated={mutate}
					title={t('make_decision')}
					editId={databaseID}
					parentId={generalApplicantRequestId}
					selectedStatus={selectedStatus}
				/>
			)}
			{opened && (
				<ApplicantRequestModal
					opened={opened}
					close={() => {
						close();
					}}
					lng={lng}
					setMutated={mutate}
					title={t('update_applicant_request')}
					editId={databaseID}
				/>
			)}
			<style jsx global>{`
				.applicant-title {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
				.title {
					font-weight: bold;
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

export default ApplicantRequestInfo;
