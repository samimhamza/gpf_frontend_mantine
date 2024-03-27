"use client";

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
import { getTimeValue, getTime } from "@/shared/functions";

interface WarehouseItemModalProps {
	warehouseId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
	editId?: number;
	mutate: any;
}

const WarehouseItemsModal = ({
	warehouseId,
	opened,
	close,
	lng,
	setMutated,
	title,
	editId = undefined,
	mutate,
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
	const [storeDatesErrorMessage, setStoreDatesErrorMessage] = useState<
		Array<string>
	>([""]);
	const [storeDates, setStoreDates] = useState<Array<Value>>([]);

	const createInitialValues: any = {
		items: [
			{
				warehouse_id: warehouseId,
				item_id: "",
				quantity: "",
				store_date: null,
				unit: "",
			},
		],
	};

	const editInitialValues: any = {
		warehouse_id: warehouseId,
		item_id: "",
		quantity: "",
		store_date: null,
		unit: "",
	};

	const form = useForm({
		initialValues: editId ? editInitialValues : createInitialValues,
		validate: zodResolver(
			editId ? editWarehouseItemSchema : warehouseItemSchema
		),
		validateInputOnBlur: true,
	});

	useEffect(() => {
		if (storeDates?.length) {
			if (editId) {
				if (storeDates[0]) {
					setStoreDatesErrorMessage([""]);
					form.setFieldValue("store_date", getTime(storeDates[0]));
				} else {
					form.setFieldValue("store_date", null);
				}
			} else {
				storeDates.forEach((item, index) => {
					if (item) {
						setStoreDatesErrorMessage((d) => {
							let errors = d.slice();
							errors[index] = "";
							return errors;
						});
						form.setFieldValue(`items.${index}.store_date`, getTime(item));
					} else {
						form.setFieldValue(`items.${index}.store_date`, null);
					}
				});
			}
		} else {
			editId
				? form.setFieldValue("store_date", null)
				: form.setFieldValue(`items.${0}.store_date`, null);
		}
	}, [storeDates]);

	const validate = () => {
		form.validate();
		let isDatesValid = true;
		if (editId && !form.values.store_date) {
			setStoreDatesErrorMessage([t("field_required")]);
			isDatesValid = false;
		} else if (!editId) {
			let indexes = form.values.items.map(
				(
					item: {
						warehouse_id: number | undefined;
						item_id: string;
						quantity: string;
						store_date: Value;
						unit: string;
					},
					index: number
				) => {
					if (!item.store_date) {
						return index;
					}
				}
			);
			let errors: Array<string> = [];
			indexes.forEach((index: number) => {
				errors[index] = t("field_required");
			});
			setStoreDatesErrorMessage(errors);
			if (errors.length) {
				isDatesValid = false;
			}
		}
		return form.isValid() && isDatesValid;
	};

	const submit = async () => {
		setSubmitLoading(true);
		if (validate()) {
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
				await mutate();
				close();
			} else if (status == 422) {
				toast.error(t("editing_not_allowed"));
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
							if (
								key != "item_id" &&
								key != "quantity" &&
								key != "store_date"
							) {
								values[key] = value ? value : editInitialValues[key];
							}
							if ((key == "item_id" || key == "quantity") && value) {
								values[key] = value.toString();
							} else if (key == "store_date" && value) {
								setStoreDates([getTimeValue(value.toString())]);
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
								warehouseId={warehouseId}
								storeDates={storeDates}
								setStoreDates={setStoreDates}
								storeDatesErrorMessage={storeDatesErrorMessage}
							/>
						) : (
							<ItemModal
								lng={lng}
								form={form}
								items={items}
								storeDates={storeDates}
								setStoreDates={setStoreDates}
								storeDatesErrorMessage={storeDatesErrorMessage}
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
