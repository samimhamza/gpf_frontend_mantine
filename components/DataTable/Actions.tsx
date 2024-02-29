import { TbEdit } from "react-icons/tb";
import { ActionIcon, Group } from "@mantine/core";
import { TbEye } from "react-icons/tb";
import { Dispatch, SetStateAction } from "react";

interface ActionsProps {
	record: any;
	setEdit: Dispatch<SetStateAction<number | undefined>>;
	setView: Dispatch<SetStateAction<number | undefined>>;
}

export const Actions = ({ record, setEdit, setView }: ActionsProps) => {
	return (
		<Group gap={4} justify="right" wrap="nowrap">
			<ActionIcon
				size="sm"
				variant="transparent"
				color="green"
				onClick={(e) => {
					e.stopPropagation(); // 👈 prevent triggering the row click function
					setView(record.id);
				}}
			>
				<TbEye size={16} />
			</ActionIcon>
			<ActionIcon
				size="sm"
				variant="transparent"
				onClick={(e) => {
					e.stopPropagation(); // 👈 prevent triggering the row click function
					setEdit(record.id);
				}}
			>
				<TbEdit size={16} />
			</ActionIcon>
		</Group>
	);
};
