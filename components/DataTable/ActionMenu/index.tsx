import { useTranslation } from "@/app/i18n/client";
import { ActionIcon, Button, Group, Input, Paper } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteApi } from "@/axios";
import { notifications } from "@mantine/notifications";

interface ActionMenuProps {
	selectedRecords: Array<any>;
	onSearch: Dispatch<SetStateAction<string>>;
	lng: string;
	mutate: any;
}

const ActionMenu = ({
	selectedRecords,
	onSearch,
	lng,
	mutate,
}: ActionMenuProps) => {
	const { t } = useTranslation(lng);
	const [search, setSearch] = useState("");
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleSearch = (e: any) => {
		if (e.keyCode == 13) {
			onSearch(search);
		}
	};

	const handleDelete = async (e: any) => {
		setDeleteLoading(true);
		const ids = selectedRecords.map((rec) => rec.id);
		const { status, error } = await deleteApi(`/users/${ids[0]}`, ids);
		if (status == 204) {
			mutate();
			notifications.show({
				position: "bottom-left",
				title: "Successfully Deleted",
				message: `sdff`,
			});
		}
		if (error)
			notifications.show({
				title: "SomeThing went wrong",
				message: "Delete operation denied",
			});
		setDeleteLoading(false);
	};

	return (
		<Paper p="md" withBorder shadow="sm" mb="md">
			<Group justify="space-between" align="center">
				<Group>
					<Input
						radius="xl"
						placeholder={t("search")}
						w="300px"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={handleSearch}
					/>
					<ActionIcon variant="filled" radius="xl" aria-label="Search">
						<IoSearch
							style={{ width: "70%", height: "70%" }}
							onClick={() => onSearch(search)}
						/>
					</ActionIcon>
				</Group>
				<Group>
					{selectedRecords.length > 0 && (
						<Button
							loading={deleteLoading}
							onClick={handleDelete}
							color="red"
							rightSection={<MdDelete size={14} />}
						>
							{t("delete")}
						</Button>
					)}
					<Button rightSection={<MdAdd size={14} />}>{t("add")}</Button>
				</Group>
			</Group>
		</Paper>
	);
};

export default ActionMenu;
