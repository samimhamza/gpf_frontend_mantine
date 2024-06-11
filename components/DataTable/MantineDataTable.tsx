'use client';

import { useTranslation } from '@/app/i18n/client';
import {
	Badge,
	Box,
	Center,
	Group,
	Paper,
	Flex,
	Button,
	MultiSelect,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import {
	FaRegFilePdf,
	FaRegFileExcel,
	FaRegCopy,
	FaPrint,
} from 'react-icons/fa';
import { TbFileTypeCsv } from 'react-icons/tb';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

interface DataProps {
	data: Array<any>;
	page: number;
	per_page: number;
	total: number;
	pageSize: number; // rohullah
}

const PAGE_SIZES = [10, 15, 20, 30, 50, 100];

interface DataTableProps {
	title: string | ReactNode;
	showSecondTitle?: boolean;
	columns: Array<any>;
	search: string;
	lng: string;
	selectedRecords: Array<any>;
	setSelectedRecords: Dispatch<SetStateAction<any>>;
	tableDetails: any;
	setTableDetails: Dispatch<SetStateAction<any>>;
	data: DataProps;
	isLoading: boolean;
	showDelete: boolean;
	orderBy: {
		column: string;
		order: 'desc' | 'asc';
	};
	height?: number;
}

const MantineDataTable = ({
	title,
	showSecondTitle,
	columns,
	search,
	lng,
	selectedRecords,
	setSelectedRecords,
	tableDetails,
	setTableDetails,
	data,
	isLoading,
	showDelete,
	orderBy,
	height,
	...additionalProps
}: DataTableProps) => {
	const [pageSize, setPageSize] = useState(PAGE_SIZES[1]); // Set initial page size
	// const [page, setPage] = useState(1); // Set initial page number

	const { t } = useTranslation(lng);
	const [sortStatus, setSortStatus] = useState<{
		columnAccessor: string;
		direction: 'desc' | 'asc';
	}>({
		columnAccessor: orderBy.column,
		direction: orderBy.order,
	});

	useEffect(() => {
		setTableDetails((d: any) => {
			return { ...d, search: search };
		});
	}, [search, setTableDetails]);

	const handlePageChange = (p: number) => {
		setTableDetails((d: any) => {
			return { ...d, page: p };
		});
	};

	const handleSortStatusChange = (status: any) => {
		setTableDetails((d: any) => {
			return {
				...d,
				page: 1,
				order_by: {
					column: status.columnAccessor,
					order: status.direction,
				},
			};
		});
		setSortStatus(status);
	};

	const dataTable = (
		<DataTable
			height={height ?? 550}
			highlightOnHover
			withColumnBorders
			striped
			verticalAlign="top"
			pinLastColumn
			columns={columns}
			fetching={isLoading}
			records={data?.data}
			page={data?.page ? data?.page : 1}
			onPageChange={handlePageChange}
			totalRecords={data?.total}
			// recordsPerPage={data?.per_page ? data?.per_page : 20}
			sortStatus={sortStatus}
			onSortStatusChange={handleSortStatusChange}
			selectedRecords={showDelete ? selectedRecords : undefined}
			onSelectedRecordsChange={
				showDelete ? setSelectedRecords : undefined
			}
			loadingText={t('loading_data')}
			noRecordsText={t('no_records')}
			// paginationText={({ from, to, totalRecords }) =>
			// 	`نمایش ${from} - ${to} از ${totalRecords}  مورد `
			// }

			recordsPerPageOptions={PAGE_SIZES}
			onRecordsPerPageChange={setPageSize}
			recordsPerPage={data?.pageSize || 20}
			recordsPerPageLabel="مورد در هر صفحه"
			// 👇 uncomment the next lines to use custom pagination colors
			// paginationActiveBackgroundColor="green"
			// paginationActiveTextColor="#e6e348"
			{...additionalProps}
		/>
	);

	return (
		<>
			<Paper withBorder shadow="sm" my="md">
				<Flex
					className="datatable_title"
					direction={{ base: 'column', sm: 'row' }}
					gap="sm"
					px="sm"
					justify={{ sm: 'space-between' }}
				>
					<Button.Group my="md">
						<Button variant="default">
							<FaRegFilePdf />
						</Button>
						<Button variant="default">
							<FaRegFileExcel />
						</Button>
						<Button variant="default">
							<TbFileTypeCsv />
						</Button>
						<Button variant="default">
							<FaRegCopy />
						</Button>
						<Button variant="default">
							<FaPrint />
						</Button>
					</Button.Group>
					<MultiSelect
						my="md"
            maxDropdownHeight={200}
						checkIconPosition="right"					
            data={[
              { label: 'آی دی', value: 'id', disabled: true },
              { label: 'پروفایل', value: 'profile', disabled: true },
              { label: 'اسم و تخلص', value: 'full_name' },
              { label: 'دفتر', value: 'office' },
              { label: 'ایمیل', value: 'email' },
              { label: 'نام کاربری', value: 'username' },
              { label: 'وضعیت', value: 'status' },
              { label: 'تاریخ ایجاد', value: 'created_at' },
              { label: 'ایجاد کننده', value: 'created_by' },
            ]}
						placeholder="نمایش"
						defaultValue={['id', 'profile', 'email']}
					/>
				</Flex>

				{/* {typeof title === 'string' ? (
					<Center className="datatable_title">
						<Group justify="space-between" align="center" p="sm">
							<Title order={4}>{title}</Title>
							{data?.total && <Badge>{data?.total}</Badge>}
						</Group>
					</Center>
				) : (
					<Box className="datatable_title">{title}</Box>
				)} */}

				{dataTable}
			</Paper>
			<style jsx global>{`
				.datatable_title {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export { MantineDataTable };
