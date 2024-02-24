"use client";

import { useTranslation } from "@/app/i18n/client";
import { getApi } from "@/axios";
import { Center } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { TbClick } from "react-icons/tb";
import useSWR from "swr";
import { Actions } from "./Actions";

interface DataTableProps {
	url: string;
	columns: Array<any>;
	lng: string;
}
const renderActions = (record: any) => <Actions record={record} />;

const CustomDataTable = ({
	url,
	columns,
	lng,
	...additionalProps
}: DataTableProps) => {
	const { t } = useTranslation(lng);
	const [sortStatus, setSortStatus] = useState<{
		columnAccessor: string;
		direction: "desc" | "asc";
	}>({
		columnAccessor: "created_at",
		direction: "desc",
	});
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [tableDetails, setTableDetails] = useState({
		page: 1,
		per_page: 20,
		search: "",
		order_by: {
			column: "created_at",
			order: "desc",
		},
		filter_data: {},
	});
	const { data, error, isLoading } = useSWR([url, tableDetails], async () => {
		const response = await getApi(url, tableDetails);
		return response;
	});

	const handlePageChange = (p: number) => {
		setTableDetails((d) => {
			return { ...d, page: p };
		});
	};

	const handleSortStatusChange = (status: any) => {
		setTableDetails((d) => {
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

	// let actionIndex = columns.findIndex((col) => col.accessor == "actions");
	// if (actionIndex == -1) {
	columns.push({
		accessor: "actions",
		title: (
			<Center>
				<TbClick size={16} />
			</Center>
		),
		width: "0%", // 👈 use minimal width
		render: renderActions,
	});
	// }
	return (
		<DataTable
			height={550}
			withTableBorder
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
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
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
			// {...additionalProps}
		/>
	);
};

export { CustomDataTable };
