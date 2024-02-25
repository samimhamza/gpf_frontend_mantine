import { useState } from "react";
import ActionMenu from "./ActionMenu";
import { MantineDataTable } from "./MantineDataTable";
import { getApi } from "@/axios";
import useSWR from "swr";

interface DataTableProps {
	url: string;
	columns: Array<any>;
	lng: string;
}

const CustomDataTable = ({
	url,
	columns,
	lng,
	...additionalProps
}: DataTableProps) => {
	const [search, setSearch] = useState("");
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
	const { data, error, isLoading, mutate } = useSWR(
		[url, tableDetails],
		async () => {
			const response = await getApi(url, tableDetails);
			return response;
		}
	);

	return (
		<>
			<ActionMenu
				onSearch={setSearch}
				lng={lng}
				selectedRecords={selectedRecords}
				mutate={mutate}
			/>
			<MantineDataTable
				url={url}
				lng={lng}
				columns={columns}
				search={search}
				selectedRecords={selectedRecords}
				setSelectedRecords={setSelectedRecords}
				tableDetails={tableDetails}
				setTableDetails={setTableDetails}
				data={data}
				isLoading={isLoading}
				{...additionalProps}
			/>
		</>
	);
};

export { CustomDataTable };
