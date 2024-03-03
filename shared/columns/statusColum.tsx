import { useAxios } from "@/customHooks/useAxios";
import { Badge, Loader, Menu, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";

export const statusColum = (
	t: (arg: string) => string,
	statusUrl: string,
	showStatus: boolean,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	const callApi = useAxios({ method: "PUT" });
	const [isLoading, setIsLoading] = useState<{
		id: number | undefined;
		isLoading: boolean;
	}>({
		id: undefined,
		isLoading: false,
	});

	const statuses = [
		{
			status: "active",
			color: "teal",
			text: t("active"),
		},
		{
			status: "inactive",
			color: "gray",
			text: t("inactive"),
		},
		{
			status: "pending",
			color: "yellow",
			text: t("pending"),
		},
		{
			status: "rejected",
			color: "red",
			text: t("rejected"),
		},
	];

	const getStatus = (status: string) => {
		return statuses.find((item) => item.status == status);
	};

	const getMenu = (id: number) =>
		statuses.map((item) => (
			<Menu.Item onClick={() => changeStatus(id, item.status)}>
				{item.text}
			</Menu.Item>
		));

	const changeStatus = async (id: number, newStatus: string) => {
		setIsLoading({ id: id, isLoading: true });
		const { status } = await callApi({
			url: statusUrl + id + "/status",
			data: {
				status: newStatus,
			},
		});
		if (status == 202) {
			setMutated(true);
		} else {
			toast.error(t("something_went_wrong"));
		}
		setIsLoading({ id: undefined, isLoading: false });
	};

	return {
		accessor: "status",
		title: t("status"),
		noWrap: true,
		sortable: true,
		render: (record: any) =>
			isLoading.id == record.id && isLoading.isLoading ? (
				<Loader size={30} />
			) : showStatus ? (
				<Menu shadow="md" width={100}>
					<Menu.Target>
						<Badge
							style={{ cursor: "pointer" }}
							color={getStatus(record.status)?.color}
							rightSection={<GoChevronDown size={10} />}
						>
							<Text size="md" fw={500}>
								{getStatus(record.status)?.text}
							</Text>
						</Badge>
					</Menu.Target>
					<Menu.Dropdown>{getMenu(record.id)}</Menu.Dropdown>
				</Menu>
			) : (
				<Badge color={getStatus(record.status)?.color}>
					<Text size="md" fw={500}>
						{getStatus(record.status)?.text}
					</Text>
				</Badge>
			),
	};
};
