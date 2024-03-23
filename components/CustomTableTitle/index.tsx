import { Button, Flex, Group, Title } from "@mantine/core";
import { MdAdd, MdDelete } from "react-icons/md";

const CustomTableTitle = ({
	title,
	handleDelete,
	showDelete,
	showAdd,
	deleteLoading,
	deleteLabel,
	addLabel,
	openModal,
}: {
	title: string;
	showDelete: boolean;
	showAdd: boolean;
	deleteLabel?: string;
	addLabel?: string;
	deleteLoading?: boolean;
	handleDelete?: any;
	openModal?: () => void;
}) => {
	return (
		<Flex
			justify={{ base: "center", sm: "space-between" }}
			align="center"
			p="sm"
			gap="sm"
			wrap="wrap"
		>
			<Title order={4}>{title}</Title>

			<Group>
				{showDelete && (
					<Button
						loading={deleteLoading}
						onClick={handleDelete}
						color="red"
						rightSection={<MdDelete size={14} />}
					>
						{deleteLabel}
					</Button>
				)}
				{showAdd && (
					<Button onClick={openModal} rightSection={<MdAdd size={14} />}>
						{addLabel}
					</Button>
				)}
			</Group>
		</Flex>
	);
};

export default CustomTableTitle;
