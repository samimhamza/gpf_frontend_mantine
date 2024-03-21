"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Center, Group, Paper, Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";

interface DataProps {
	data: Array<any>;
	page: number;
	per_page: number;
	total: number;
}

interface DataTableProps {
	title: string | ReactNode;
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
		order: "desc" | "asc";
	};
	height?: number;
}

const MantineDataTable = ({
	title,
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
	const { t } = useTranslation(lng);
	const [sortStatus, setSortStatus] = useState<{
		columnAccessor: string;
		direction: "desc" | "asc";
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
			height={height ? height : 550}
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
			recordsPerPage={data?.per_page ? data?.per_page : 20}
			sortStatus={sortStatus}
			onSortStatusChange={handleSortStatusChange}
			selectedRecords={showDelete ? selectedRecords : undefined}
			onSelectedRecordsChange={showDelete ? setSelectedRecords : undefined}
			loadingText={t("loading_data")}
			noRecordsText={t("no_records")}
			// paginationText={({ from, to, totalRecords }) =>
			// 	`Records ${from} - ${to} of ${totalRecords}`
			// }
			// 👇 uncomment the next lines to use custom pagination colors
			// paginationActiveBackgroundColor="green"
			// paginationActiveTextColor="#e6e348"
			{...additionalProps}
		/>
	);

	return (
		<>
			<Paper withBorder shadow="sm" my="md">
				{typeof title == "string" ? (
					<Center className="datatable_title">
						<Group justify="space-between" align="center" p="sm">
							<Title order={4}>{title}</Title>
						</Group>
					</Center>
				) : (
					<Box className="datatable_title">{title}</Box>
				)}
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
