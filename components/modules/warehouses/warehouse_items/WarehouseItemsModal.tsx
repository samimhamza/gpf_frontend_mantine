import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import {
	EditWarehouseItemSchema,
	WarehouseItemSchema,
} from "@/schemas/models/warehouse_items";
import {
	Button,
	CloseButton,
	Group,
	LoadingOverlay,
	Modal,
	ScrollArea,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Value } from "react-multi-date-picker";
import ItemsModal from "./ItemsModal";
import ItemModal from "./ItemModal";

interface WarehouseItemModalProps {
	warehouseId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
	editId?: number;
}

const WarehouseItemsModal = ({
	warehouseId,
	opened,
	close,
	lng,
	setMutated,
	title,
	editId = undefined,
}: WarehouseItemModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const callApi = useAxios();
	const warehouseItemSchema = WarehouseItemSchema(t);
	const editWarehouseItemSchema = EditWarehouseItemSchema(t);
	const [items, setItems] = useState<
		Array<{
			value: string;
			label: string;
			unit: string;
		}>
	>([]);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [storeDateErrorMessage, setStoreDateErrorMessage] = useState("");
	const [storeDate, setStoreDate] = useState<Value>();

	const createInitialValues: any = {
		items: [{ warehouse_id: warehouseId, item_id: "", quantity: "", unit: "" }],
	};

	const editInitialValues: any = {
		warehouse_id: warehouseId,
		item_id: "",
		quantity: "",
		unit: "",
	};

	const form = useForm({
		initialValues: editId ? editInitialValues : createInitialValues,
		validate: zodResolver(
			editId ? editWarehouseItemSchema : warehouseItemSchema
		),
		validateInputOnBlur: true,
	});

	const checkUniqueness = async () => {
		const data: any = {
			warehouse_id: warehouseId,
			id: editId ? editId : null,
		};
		if (editId) {
			data.item_id = form.values.item_id;
		} else {
			data.item_ids = form.values.items.map((item: any) => item.item_id);
		}
		let { response, status } = await callApi({
			method: "POST",
			url: "/warehouse_items/check_uniqueness",
			data: data,
		});
		if (status == 226) {
			if (editId) {
				form.setErrors({
					item_id: t("value_already_exists"),
				});
			} else {
				let indexes = form.values.items.map(
					(
						item: {
							item_id: string;
							quantity: string;
							unit: string;
						},
						index: number
					) => {
						const i = response.message.findIndex(
							(item_id: string) => item_id == item.item_id
						);
						if (i != -1) {
							return index;
						}
					}
				);
				let errors: any = {};
				indexes.forEach((index: number) => {
					errors[`items.${index}.item_id`] = t("value_already_exists");
				});
				form.setErrors(errors);
			}
			return false;
		} else if (status !== 200) return false;
		return true;
	};

	const submit = async () => {
		setSubmitLoading(true);
		form.validate();
		if (form.isValid()) {
			const uniqueness = await checkUniqueness();
			if (uniqueness) {
				const { response, status } = !editId
					? await callApi({
							method: "POST",
							url: `/warehouse_items`,
							data: form.values,
					  })
					: await callApi({
							method: "PUT",
							url: `/warehouse_items/${editId}`,
							data: form.values,
					  });
				if ((!editId ? status == 201 : status == 202) && response.result) {
					setMutated(true);
					close();
				} else {
					toast.error(t("something_went_wrong"));
				}
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

	useEffect(() => {
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/warehouse_items/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(editInitialValues).includes(key)) {
							if (key != "item_id" && key != "quantity") {
								values[key] = value ? value : editInitialValues[key];
							}
							if ((key == "item_id" || key == "quantity") && value) {
								values[key] = value.toString();
							}
						}
					});
					form.setValues(values);
					setLoading(false);
				}
			})();
		}
	}, [editId]);

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
					<ScrollArea h={380} pos="relative">
						<LoadingOverlay
							visible={loading}
							zIndex={1000}
							overlayProps={{ radius: "sm", blur: 2 }}
						/>
						{!editId ? (
							<ItemsModal
								lng={lng}
								form={form}
								items={items}
								storeDate={storeDate}
								setStoreDate={setStoreDate}
								storeDateErrorMessage={storeDateErrorMessage}
							/>
						) : (
							<ItemModal
								lng={lng}
								form={form}
								items={items}
								storeDate={storeDate}
								setStoreDate={setStoreDate}
								storeDateErrorMessage={storeDateErrorMessage}
							/>
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
