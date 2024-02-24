import { useTranslation } from "@/app/i18n/client";
import { ActionIcon, Button, Group, Input, Paper } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const ActionMenu = ({ lng }: { lng: string }) => {
	const { t } = useTranslation(lng);
	return (
		<Paper p="md" withBorder shadow="sm" mb="md">
			<Group justify="space-between" align="center">
				<Group>
					<Input radius="xl" placeholder={t("search")} w="300px" />
					<ActionIcon variant="filled" radius="xl" aria-label="Search">
						<IoSearch style={{ width: "70%", height: "70%" }} />
					</ActionIcon>
				</Group>
				<Group>
					<Button rightSection={<MdAdd size={14} />}>{t("add")}</Button>
					<Button color="red" rightSection={<MdDelete size={14} />}>
						{t("delete")}
					</Button>
				</Group>
			</Group>
		</Paper>
	);
};

export default ActionMenu;
