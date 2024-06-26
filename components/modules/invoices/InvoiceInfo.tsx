'use client';

import { useTranslation } from '@/app/i18n/client';
import { useAxios } from '@/customHooks/useAxios';
import { sharedStatuses } from '@/shared/columns';
import { getDateTime } from '@/shared/functions';
import { TbEdit } from 'react-icons/tb';
import { UPDATE_TEAMS } from '@/shared/constants/Permissions';
import { InvoiceItemsColumns } from '@/shared/columns/invoices/invoice_items_columns';
import {
	Box,
	Button,
	Flex,
	Grid,
	Divider,
	Group,
	LoadingOverlay,
	Table,
	Paper,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { permissionChecker } from '@/shared/functions/permissionChecker';
import InvoiceModal from './InvoiceModal';

const InvoiceInfo = ({
	invoiceId,
	databaseID,
	lng,
	data,
	loading,
	mutate,
}: {
	invoiceId: string | undefined;
	databaseID: number;
	lng: string;
	data: any;
	loading: boolean;
	mutate: any;
}) => {
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);

	const invoiceDetails = [
		{ label: t('id'), value: data?.id },
		{ label: t('invoice_number'), value: data?.invoice_number },
		{ label: t('vendor_name'), value: data?.vendor_name },
		{ label: t('warehouse'), value: data?.warehouse?.name },
		{
			label: t('purchaser'),
			value:
				data?.purchased_by?.first_name +
				' ' +
				data?.purchased_by?.last_name,
		},
		{ label: t('purchase_date'), value: data?.purchase_date },
		{ label: t('due_date'), value: data?.due_date },
		{ label: t('payment_status'), value: data?.payment_status },
		{ label: t('total_price'), value: data?.total_price },
		{ label: t('remarks'), value: data?.remarks },
		{ label: t('created_at'), value: data?.created_at && getDateTime(data?.created_at) },
		{ label: t('created_by'), value: data?.created_by?.full_name },
		{ label: t('updated_at'), value: data?.updated_at && getDateTime(data?.updated_at) },
		{ label: t('updated_by'), value: data?.updated_by?.full_name },
	];


	const columns = InvoiceItemsColumns(t);
	const rows = data?.items?.map((element: any) => (
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
					<Title order={3}>{t('team_info')}</Title>
					<Group>
						{checkPermission(UPDATE_TEAMS) && (
							<Button
								onClick={() => open()}
								rightSection={<TbEdit size={16} />}
							>
								{t('edit')}
							</Button>
						)}
					</Group>
				</Flex>
				<Divider mb="md" />

				<Box pos="relative" p="md">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>

					<Grid px="sm">
						{invoiceDetails.map((detail, index) => (
							<Grid.Col key={index} span={{ base: 12, sm: 6 }}>
								<Text span fw="bold" pe={10}>
									{detail.label} :
								</Text>
								<Text span>{detail.value}</Text>
							</Grid.Col>
						))}
					</Grid>				
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
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Box>
			</Paper>
		</>
	);
};

export default InvoiceInfo;
