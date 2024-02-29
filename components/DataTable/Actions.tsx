import { TbEdit } from "react-icons/tb";
import { ActionIcon, Group } from "@mantine/core";
import { TbEye } from "react-icons/tb";

export const Actions = ({ record }: { record: any }) => {
	return (
		<Group gap={4} justify="right" wrap="nowrap">
			<ActionIcon
				size="sm"
				variant="transparent"
				color="green"
				onClick={(e) => {
					e.stopPropagation(); // 👈 prevent triggering the row click function
					console.log(record);

					console.log("edit");
				}}
			>
				<TbEye size={16} />
			</ActionIcon>
			<ActionIcon
				size="sm"
				variant="transparent"
				onClick={(e) => {
					e.stopPropagation(); // 👈 prevent triggering the row click function
					console.log(record);

					console.log("edit");
				}}
			>
				<TbEdit size={16} />
			</ActionIcon>
		</Group>
	);
};
