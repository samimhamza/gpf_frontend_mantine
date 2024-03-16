import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionMenu from "./ActionMenu";
import { MantineDataTable } from "./MantineDataTable";
import useSWR from "swr";
import { Center } from "@mantine/core";
import { useAxios } from "@/customHooks/useAxios";
import { TbClick } from "react-icons/tb";
import { Actions } from "./Actions";

interface DataTableProps {
	title: string;
	url: string;
	deleteUrl: string;
	columns: Array<any>;
	lng: string;
	open?: () => void;
	mutated: boolean;
	setMutated: Dispatch<SetStateAction<boolean>>;
	setEdit: Dispatch<SetStateAction<number | undefined>>;
	setView?: Dispatch<SetStateAction<number | undefined>>;
	showAdd: boolean;
	showDelete: boolean;
	showEdit: boolean;
	showView?: boolean;
	setAddPackage?: Dispatch<SetStateAction<number | undefined>>;
	packageTitle?: string;
	setPrintOrViewCard?: Dispatch<SetStateAction<number | undefined>>;
	height?: number;
	orderBy?: {
		column: string;
		order: "desc" | "asc";
	};
}

const CustomDataTable = ({
	title,
	url,
	deleteUrl,
	columns,
	lng,
	open,
	mutated,
	setMutated,
	setEdit,
	setView,
	showAdd,
	showDelete,
	showEdit,
	showView = true,
	setAddPackage = undefined,
	packageTitle = undefined,
	setPrintOrViewCard = undefined,
	height = undefined,
	orderBy = {
		column: "created_at",
		order: "desc",
	},
	...additionalProps
}: DataTableProps) => {
	const callApi = useAxios();
	const [search, setSearch] = useState("");
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [tableDetails, setTableDetails] = useState({
		page: 1,
		per_page: 20,
		search: "",
		order_by: orderBy,
		filter_data: {},
	});
	const { data, error, isLoading, mutate } = useSWR(
		[url, tableDetails],
		async () => {
			const { response } = await callApi({
				method: "GET",
				url,
				params: tableDetails,
			});
			return response;
		}
	);

	useEffect(() => {
		(async function () {
			if (mutated) {
				await mutate();
				setMutated(false);
			}
		})();
	}, [mutated, setMutated, mutate]);

	const renderActions = (record: any) => (
		<Actions
			record={record}
			setEdit={setEdit}
			setView={setView}
			showEdit={showEdit}
			showView={showView}
			setAddPackage={setAddPackage}
			packageTitle={packageTitle}
			setPrintOrViewCard={setPrintOrViewCard}
		/>
	);

	let actionIndex = columns.findIndex((col) => col.accessor == "actions");
	if (actionIndex == -1) {
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
	}

	return (
		<>
			<ActionMenu
				deleteUrl={deleteUrl}
				onSearch={setSearch}
				lng={lng}
				selectedRecords={selectedRecords}
				setSelectedRecords={setSelectedRecords}
				mutate={mutate}
				open={open}
				showAdd={showAdd}
				showDelete={showDelete}
			/>
			<MantineDataTable
				title={title}
				lng={lng}
				columns={columns}
				search={search}
				selectedRecords={selectedRecords}
				setSelectedRecords={setSelectedRecords}
				tableDetails={tableDetails}
				setTableDetails={setTableDetails}
				data={data}
				isLoading={isLoading}
				showDelete={showDelete}
				height={height}
				orderBy={orderBy}
				{...additionalProps}
			/>
		</>
	);
};

export { CustomDataTable };
