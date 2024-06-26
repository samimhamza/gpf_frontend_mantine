'use client';

import { useTranslation } from '@/app/i18n/client';
import { useAxios } from '@/customHooks/useAxios';
import { sharedStatuses } from '@/shared/columns';
import { getDateTime } from '@/shared/functions';
import { TbEdit } from 'react-icons/tb';
import { UPDATE_TEAMS } from '@/shared/constants/Permissions';

import {
	Box,
	Button,
	Flex,
	Group,
	LoadingOverlay,
	Table,
	Paper,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { permissionChecker } from '@/shared/functions/permissionChecker';
import GeneralApplicantModal from './GeneralApplicantModal';
import { ApplicantRequestInfoColumns } from '@/shared/columns/general_applicants/applicant_request_info_columns';

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
	const [mutated, setMutated] = useState(false);

	const columns = ApplicantRequestInfoColumns(t);
	const rows = data?.requests?.map((element: any) => (
		<Table.Tr key={element?.id}>
			{columns.map((column) => (
				<Table.Td key={column.accessor}>
					{column.render
						? column.render(element)
						: element[column.accessor]}
				</Table.Td>
			))}
		</Table.Tr>
	));

	const ths = (
		<Table.Tr>
			{columns.map((column) => (
				<Table.Th key={column.accessor}>{column.title}</Table.Th>
			))}
		</Table.Tr>
	);

	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const statuses = sharedStatuses(t);
	const callApi = useAxios();
	const [statusLoading, setStatusLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const checkPermission = (permission: string) => {
		const hasPermission = permissionChecker(permission);
		return hasPermission;
	};

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
					<Title order={3}>{t('general_applicant_info')}</Title>
					<Group>
						{4 > 2 && (
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
							<Text className="title">{t('name')} :</Text>
							<Text>{data?.name}</Text>
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
							<Text className="title">{t('agent_name')} :</Text>
							<Text>{data?.agent_name}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('agent_phone')} :</Text>
							<Text>{data?.agent_phone}</Text>
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
							<Text className="title">
								{t('applicant_type')} :
							</Text>
							<Text>{data?.applicant_type}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">
								{t('referenced_by')} :
							</Text>
							<Text>
								{data?.reference?.first_name +
									' ' +
									data?.reference?.last_name}
							</Text>
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
							<Text className="title">{t('province')} :</Text>
							<Text>{data?.province?.name_fa}</Text>
						</Group>
						<Group flex={1}>
							<Text className="title">{t('district')} :</Text>
							<Text>{data?.district?.name_fa}</Text>
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
							<Text className="title">{t('address')} :</Text>
							<Text>{data?.address}</Text>
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
					{t('requests')}
				</Title>
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<Table horizontalSpacing="xs" striped highlightOnHover>
						<Table.Thead>{ths}</Table.Thead>
						<Table.Tbody>
								{rows}
							
						</Table.Tbody>
					</Table>
				</Box>
			</Paper>
			{opened && (
				<GeneralApplicantModal
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
