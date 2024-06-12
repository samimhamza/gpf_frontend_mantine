'use client';

import { useTranslation } from '@/app/i18n/client';
import { useAxios } from '@/customHooks/useAxios';
import { sharedStatuses } from '@/shared/columns';
import { getDateTime } from '@/shared/functions';
import {
	Avatar,
	Badge,
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Group,
	Loader,
	LoadingOverlay,
	Menu,
	Paper,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { permissionChecker } from '@/shared/functions/permissionChecker';
import ApplicantRequestModal from './ApplicantRequestModal';

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
	const statuses = sharedStatuses(t);
	const callApi = useAxios();
	const [statusLoading, setStatusLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	// const checkPermission = (permission: string) => {
	// 	const hasPermission = permissionChecker(permission);
	// 	return hasPermission && data?.status == 'active';
	// };

	return (
		<>
			<Paper withBorder shadow="sm" mb="md">
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
							<Text className="title">{t('applicant_name')} :</Text>
							<Text>{data?.general_applicant?.agent_name}</Text>
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
							<Text>{data?.priority}</Text>
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
							<Text>{data?.status}</Text>
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

                    <Divider my={20}></Divider>
                    <Flex
						px="sm"
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						pt="sm"
						justify="center"
					>
						<Group flex={1}>
							<Text className="title">{t('decision')} :</Text>					
                            <Text>{data?.decision?.decision}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('decided_by')} :</Text>
                            <Text>{data?.decision?.user?.username}</Text>

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
							<Text className="title">{t('decided_at')} :</Text>
							{data?.decision && (
								<Text>{getDateTime(data?.decision?.decided_at)}</Text>
							)}
						</Group>
						<Group flex={1}>
							<Text className="title">{t('reason')} :</Text>
                            <Text>{data?.decision?.reason}</Text>
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
							{data?.decision && (
								<Text>{getDateTime(data?.decision?.created_at)}</Text>
							)}
						</Group>
						<Group flex={1}>
							<Text className="title">{t('updated_at')} :</Text>
							{data?.decision && (
								<Text>{getDateTime(data?.decision?.updated_at)}</Text>
							)}
						</Group>
					</Flex>
				</Box>
			</Paper>
			{opened && (
				<ApplicantRequestModal
					opened={opened}
					close={() => {
						close();
					}}
					lng={lng}
					setMutated={mutate}
					title={t('update_user')}
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
