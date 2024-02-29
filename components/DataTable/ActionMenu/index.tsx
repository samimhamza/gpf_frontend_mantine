import { useTranslation } from "@/app/i18n/client";
import { ActionIcon, Button, Group, Input, Paper } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useAxios } from "@/customHooks/useAxios";

interface ActionMenuProps {
	deleteUrl: string;
	selectedRecords: Array<any>;
	setSelectedRecords: Dispatch<SetStateAction<any>>;
	onSearch: Dispatch<SetStateAction<string>>;
	lng: string;
	mutate: any;
	open?: () => void;
}

const ActionMenu = ({
	deleteUrl,
	selectedRecords,
	setSelectedRecords,
	onSearch,
	lng,
	mutate,
	open,
}: ActionMenuProps) => {
	const { t } = useTranslation(lng);
	const [search, setSearch] = useState("");
	const [deleteLoading, setDeleteLoading] = useState(false);
	const callApi = useAxios({ method: "DELETE" });

	const handleSearch = (e: any) => {
		if (e.keyCode == 13) {
			onSearch(search);
		}
	};

	const handleDelete = async (e: any) => {
		setDeleteLoading(true);
		const ids = selectedRecords.map((rec) => rec.id);
		const { status, error } = await callApi({
			url: deleteUrl,
			data: { ids },
		});

		if (status == 204) {
			await mutate();
			setSelectedRecords([]);
			toast.success(t("successfully_deleted"));
		}
		if (error) toast.error(t("something_went_wrong"));

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
					<Button onClick={open} rightSection={<MdAdd size={14} />}>
						{t("add")}
					</Button>
				</Group>
			</Group>
		</Paper>
	);
};

export default ActionMenu;
