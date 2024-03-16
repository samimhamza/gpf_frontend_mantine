"use client";

import { useTranslation } from "@/app/i18n/client";
import { DataTable } from "mantine-datatable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DataProps {
	data: Array<any>;
	page: number;
	per_page: number;
	total: number;
}

interface DataTableProps {
	title: string;
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

	return (
		<>
			<DataTable
				height={height ? height : 550}
				withTableBorder
				highlightOnHover
				withColumnBorders
				striped
				verticalAlign="top"
				pinLastColumn
				columns={columns}
				groups={[
					{
						id: "title",
						title: title,
						textAlign: "center",
						columns: columns,
					},
				]}
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
				shadow="sm"
				borderRadius="sm"
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
		</>
	);
};

export { MantineDataTable };
