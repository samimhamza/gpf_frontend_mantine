import { useAxios } from "@/customHooks/useAxios";
import { Badge, Center, Loader, Menu, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { GoChevronDown } from "react-icons/go";

export const statusColum = (
	t: (arg: string) => string,
	statuses: Array<{
		status: string;
		color: string;
		text: string;
	}>,
	statusUrl: string,
	showStatus: boolean,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	const callApi = useAxios();
	const [isLoading, setIsLoading] = useState<{
		id: number | undefined;
		isLoading: boolean;
	}>({
		id: undefined,
		isLoading: false,
	});

	const getStatus = (status: string) => {
		return statuses.find((item) => item.status == status);
	};

	const getMenu = (id: number, currentStatus: string) =>
		statuses.map((item) => (
			<Menu.Item onClick={() => changeStatus(id, currentStatus, item.status)}>
				{item.text}
			</Menu.Item>
		));

	const changeStatus = async (
		id: number,
		currentStatus: string,
		newStatus: string
	) => {
		if (currentStatus != newStatus) {
			setIsLoading({ id: id, isLoading: true });
			const { status } = await callApi({
				method: "PUT",
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
		}
	};

	return {
		accessor: "status",
		title: t("status"),
		noWrap: true,
		sortable: true,
		render: (record: any) =>
			isLoading.id == record.id && isLoading.isLoading ? (
				<Center>
					<Loader size={18} />
				</Center>
			) : showStatus ? (
				<Center>
					<Menu shadow="md" width={100}>
						<Menu.Target>
							<Badge
								style={{ cursor: "pointer" }}
								color={getStatus(record.status)?.color}
								rightSection={<GoChevronDown size={16} />}
							>
								<Text size="md" fw={500}>
									{getStatus(record.status)?.text}
								</Text>
							</Badge>
						</Menu.Target>
						<Menu.Dropdown>{getMenu(record.id, record.status)}</Menu.Dropdown>
					</Menu>
				</Center>
			) : (
				<Center>
					<Badge color={getStatus(record.status)?.color}>
						<Text size="md" fw={500}>
							{getStatus(record.status)?.text}
						</Text>
					</Badge>
				</Center>
			),
	};
};
