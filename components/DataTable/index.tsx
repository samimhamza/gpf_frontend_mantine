import { useState } from "react";
import ActionMenu from "./ActionMenu";
import { MantineDataTable } from "./MantineDataTable";

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
	return (
		<>
			<ActionMenu onSearch={setSearch} lng={lng} />
			<MantineDataTable
				url={url}
				lng={lng}
				columns={columns}
				search={search}
				{...additionalProps}
			/>
		</>
	);
};

export { CustomDataTable };
