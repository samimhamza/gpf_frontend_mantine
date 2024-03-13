import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { WarehouseItemSchema } from "@/schemas/models/warehouse_items";
import {
	ActionIcon,
	Box,
	Button,
	CloseButton,
	Fieldset,
	Flex,
	Group,
	Modal,
	ScrollArea,
	Select,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdSend } from "react-icons/md";

interface WarehouseItemModalProps {
	warehouseId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
}

const WarehouseItemsModal = ({
	warehouseId,
	opened,
	close,
	lng,
	setMutated,
	title,
}: WarehouseItemModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const callApi = useAxios();
	const warehouseItemSchema = WarehouseItemSchema(t);
	const [items, setItems] = useState<
		Array<{
			value: string;
			label: string;
			unit: string;
		}>
	>([]);
	const [submitLoading, setSubmitLoading] = useState(false);

	const initialValues: any = {
		items: [{ item_id: "", quantity: "", unit: "" }],
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(warehouseItemSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		setSubmitLoading(true);
		form.validate();
		if (form.isValid()) {
			const { response, status } = await callApi({
				method: "POST",
				url: `/add_warehouse_items/${warehouseId}`,
				data: form.values,
			});
			if (status == 201 && response.result) {
				setMutated(true);
				close();
			} else {
				toast.error(t("something_went_wrong"));
			}
		}
		setSubmitLoading(false);
	};

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
				url: "/all_items",
			});
			if (status == 200 && response.result == true) {
				setItems(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: item.name,
							unit: item.unit,
						};
					})
				);
			}
		})();
	}, []);

	return (
		<>
			<form>
				<Modal
					opened={opened}
					centered
					size={mdMatches ? "65%" : smMatches ? "80%" : "100%"}
					className="custom-modal"
					withCloseButton={false}
					onClose={close}
					overlayProps={{
						backgroundOpacity: 0.55,
						blur: 3,
					}}
					transitionProps={{ transition: "pop" }}
					lockScroll={true}
					closeOnClickOutside={false}
				>
					<Group justify="space-between" className="modal-header" p="xs">
						<Title order={4}>{title}</Title>
						<CloseButton
							className="close-btn"
							aria-label="Close modal"
							onClick={close}
						/>
					</Group>
					<ScrollArea h={380}>
						{form.values.items.map(
							(
								item: {
									item_id: string;
									quantity: string;
									unit: string;
								},
								index: number
							) => (
								<Box p="sm" key={index}>
									<Flex gap="sm" px="sm" justify="flex-end">
										{form.values.items.length - 1 == index && (
											<ActionIcon
												onClick={() =>
													form.insertListItem("items", {
														item_id: "",
														quantity: "",
														unit: "",
													})
												}
											>
												<IoAddCircle size="1.5rem" />
											</ActionIcon>
										)}
										{form.values.items.length !== 1 && (
											<ActionIcon
												color="red"
												onClick={() =>
													form.values.items.length !== 1 &&
													form.removeListItem("items", index)
												}
											>
												<FaTrashAlt size="1rem" />
											</ActionIcon>
										)}
									</Flex>
									<Fieldset legend={t("item_info")}>
										<Flex
											px="sm"
											direction={{ base: "column", sm: "row" }}
											gap="sm"
											pt="sm"
											justify={{ sm: "center" }}
										>
											<Select
												style={{ flex: 1 }}
												label={t("item")}
												placeholder={t("item")}
												withAsterisk
												data={items}
												searchable
												clearable
												nothingFoundMessage={t("noting_found")}
												{...form.getInputProps(`items.${index}.item_id`)}
												onChange={(value) => {
													form.setFieldValue(`items.${index}.item_id`, value);
													let item = items.find((item) => item.value == value);
													form.setFieldValue(`items.${index}.unit`, item?.unit);
												}}
											/>
											<TextInput
												style={{ flex: 1 }}
												label={t("quantity")}
												placeholder={t("quantity")}
												withAsterisk
												{...form.getInputProps(`items.${index}.quantity`)}
											/>
										</Flex>
										<Flex
											px="sm"
											direction={{ base: "column", sm: "row" }}
											gap="sm"
											pt="sm"
											justify={{ sm: "center" }}
										>
											<TextInput
												disabled
												style={{ flex: 1 }}
												label={t("unit")}
												placeholder={t("unit")}
												withAsterisk
												{...form.getInputProps(`items.${index}.unit`)}
											/>
											<Box style={{ flex: 1 }}></Box>
										</Flex>
									</Fieldset>
								</Box>
							)
						)}
					</ScrollArea>
					<Group justify="flex-end" p="sm" className="modal-footer">
						<Button
							rightSection={
								<MdSend
									style={{
										transform: "rotate(-180deg)",
									}}
								/>
							}
							variant="gradient"
							type="submit"
							onClick={submit}
							loading={submitLoading}
						>
							{t("submit")}
						</Button>
					</Group>
				</Modal>
			</form>
			<style jsx global>{`
				.custom-modal .mantine-Modal-body {
					padding: 0;
				}
				.custom-modal .modal-header {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
				.custom-modal .modal-footer {
					border-top: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export default WarehouseItemsModal;
