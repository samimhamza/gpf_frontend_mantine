import { useState } from "react";
import ActionMenu from "./ActionMenu";
import { MantineDataTable } from "./MantineDataTable";
import useSWR from "swr";
import { useAxios } from "@/customHooks/useAxios";

interface DataTableProps {
	url: string;
	columns: Array<any>;
	lng: string;
	open?: () => void;
}

const CustomDataTable = ({
	url,
	columns,
	lng,
	open,
	...additionalProps
}: DataTableProps) => {
	const callApi = useAxios({ method: "GET" });
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
			const { response } = await callApi({
				url,
				params: tableDetails,
			});
			return response;
		}
	);

	return (
		<>
			<ActionMenu
				onSearch={setSearch}
				lng={lng}
				selectedRecords={selectedRecords}
				setSelectedRecords={setSelectedRecords}
				mutate={mutate}
				open={open}
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
