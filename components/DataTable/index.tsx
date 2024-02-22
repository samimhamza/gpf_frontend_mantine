import { DataTable } from "mantine-datatable";

interface DataTableProps {
	columns: Array<any>;
	records: Array<any>;
	page: number;
	total: number;
	changePage: Function;
	per_page: number;
}

const CustomDataTable = ({
	columns,
	records,
	total,
	page,
	per_page,
	changePage,
	...additionalProps
}: DataTableProps) => {
	return (
		<DataTable
			records={records}
			columns={columns}
			totalRecords={total}
			recordsPerPage={per_page}
			page={page}
			onPageChange={(p) => changePage(p)}
			height={800}
			withTableBorder
			withColumnBorders
			highlightOnHover
			striped
			shadow="sm"
			borderRadius="sm"
			// 👇 uncomment the next line to use a custom pagination size
			// paginationSize="md"
			// 👇 uncomment the next line to use a custom loading text
			// loadingText="Loading..."
			// 👇 uncomment the next line to display a custom text when no records were found
			// noRecordsText="No records found"
			// 👇 uncomment the next line to use a custom pagination text
			// paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
			// 👇 uncomment the next lines to use custom pagination colors
			// paginationActiveBackgroundColor="green"
			// paginationActiveTextColor="#e6e348"
			{...additionalProps}
		/>
	);
};

export { CustomDataTable };
