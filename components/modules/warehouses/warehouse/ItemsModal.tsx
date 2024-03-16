"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import {
	ActionIcon,
	Box,
	Fieldset,
	Flex,
	Select,
	TextInput,
} from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Value } from "react-multi-date-picker";

const ItemsModal = ({
	lng,
	form,
	items,
	warehouseId,
	storeDates,
	setStoreDates,
	storeDatesErrorMessage,
}: {
	lng: string;
	form: any;
	items: Array<{ value: string; label: string; unit: string }>;
	warehouseId: number | undefined;
	storeDates: Array<Value>;
	setStoreDates: Dispatch<SetStateAction<Array<Value>>>;
	storeDatesErrorMessage: Array<string>;
}) => {
	const { t } = useTranslation(lng);

	return form.values.items.map(
		(
			item: {
				item_id: string;
				quantity: string;
				store_date: Value | undefined;
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
									warehouse_id: warehouseId,
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
							onClick={() => {
								if (form.values.items.length !== 1) {
									form.removeListItem("items", index);
									setStoreDates((d) => {
										let newDates = d.slice();
										newDates.splice(index, 1);
										return newDates;
									});
								}
							}}
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
							label={t("unit")}
							placeholder={t("unit")}
							withAsterisk
							{...form.getInputProps(`items.${index}.unit`)}
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
							style={{ flex: 1 }}
							label={t("quantity")}
							placeholder={t("quantity")}
							withAsterisk
							{...form.getInputProps(`items.${index}.quantity`)}
						/>
						<PersianDatePicker
							label={t("store_date")}
							placeholder={t("store_date")}
							value={storeDates?.[index]}
							onChange={(value: Value) => {
								setStoreDates((dates) => {
									let newDates = dates.slice();
									newDates[index] = value;
									return newDates;
								});
							}}
							errorMessage={storeDatesErrorMessage[index]}
						/>
					</Flex>
				</Fieldset>
			</Box>
		)
	);
};

export default ItemsModal;
