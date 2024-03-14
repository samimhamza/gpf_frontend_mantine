"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { Flex, Select, TextInput } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { Value } from "react-multi-date-picker";

const ItemModal = ({
	lng,
	form,
	items,
	storeDate,
	setStoreDate,
	storeDateErrorMessage,
}: {
	lng: string;
	form: any;
	items: Array<{ value: string; label: string; unit: string }>;
	storeDate: Value | undefined;
	setStoreDate: Dispatch<SetStateAction<Value | undefined>>;
	storeDateErrorMessage: string;
}) => {
	const { t } = useTranslation(lng);

	return (
		<>
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
					{...form.getInputProps(`item_id`)}
					onChange={(value) => {
						form.setFieldValue(`item_id`, value);
						let item = items.find((item) => item.value == value);
						form.setFieldValue(`unit`, item?.unit);
					}}
				/>
				<TextInput
					disabled
					style={{ flex: 1 }}
					label={t("unit")}
					placeholder={t("unit")}
					withAsterisk
					{...form.getInputProps(`unit`)}
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
					{...form.getInputProps(`quantity`)}
				/>
				<PersianDatePicker
					label={t("store_date")}
					placeholder={t("store_date")}
					value={storeDate}
					onChange={setStoreDate}
					errorMessage={storeDateErrorMessage}
				/>
			</Flex>
		</>
	);
};

export default ItemModal;
