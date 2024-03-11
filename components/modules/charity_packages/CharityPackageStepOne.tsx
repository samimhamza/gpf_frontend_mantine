"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Select, TextInput } from "@mantine/core";
import { DateObject, type Value } from "react-multi-date-picker";
import { Dispatch, SetStateAction, useEffect } from "react";
import PersianDatePicker from "@/components/PersianDatePicker";

interface CharityPackageStepOneProps {
	form: any;
	lng: string;
	offices: Array<{ value: string; label: string }>;
	categories: Array<{ value: string; label: string }>;
	startDateErrorMessage: string;
	setStartDateErrorMessage: Dispatch<SetStateAction<string>>;
	endDateErrorMessage: string;
	setEndDateErrorMessage: Dispatch<SetStateAction<string>>;
	startDate: Value | undefined;
	setStartDate: Dispatch<SetStateAction<Value | undefined>>;
	endDate: Value | undefined;
	setEndDate: Dispatch<SetStateAction<Value | undefined>>;
}

const CharityPackageStepOne = ({
	form,
	lng,
	offices,
	categories,
	startDateErrorMessage,
	setStartDateErrorMessage,
	endDateErrorMessage,
	setEndDateErrorMessage,
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}: CharityPackageStepOneProps) => {
	const { t } = useTranslation(lng);
	const currencies = [
		{ value: "AFN", label: t("afn") },
		{ value: "USD", label: t("usd") },
	];

	const getTime = (date: any) => {
		return date instanceof DateObject
			? date?.toDate?.().getTime()
			: date instanceof Date
			? date.getTime()
			: typeof date == "string"
			? new Date(date).getTime()
			: date;
	};

	useEffect(() => {
		if (startDate) {
			setStartDateErrorMessage("");
			form.setFieldValue("start_date", getTime(startDate));
		} else {
			form.setFieldValue("start_date", null);
		}
	}, [startDate]);

	useEffect(() => {
		if (endDate) {
			setEndDateErrorMessage("");
			form.setFieldValue("end_date", getTime(endDate));
		} else {
			form.setFieldValue("end_date", null);
		}
	}, [endDate]);

	useEffect(() => {
		if (endDate && startDate) {
			if (endDate < startDate) {
				setEndDateErrorMessage(t("end_date_must_be_greater"));
			}
		}
	}, [startDate, endDate]);

	return (
		<Box>
			<Flex
				px="sm"
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				pt="sm"
				justify={{ sm: "center" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("name")}
					placeholder={t("name")}
					withAsterisk
					{...form.getInputProps("name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("period")}
					placeholder={t("period")}
					withAsterisk
					{...form.getInputProps("period")}
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				px="sm"
				pt="sm"
				justify={{ sm: "center" }}
			>
				<Select
					style={{ flex: 1 }}
					label={t("category")}
					placeholder={t("category")}
					withAsterisk
					data={categories}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("category_id")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("office")}
					placeholder={t("office")}
					withAsterisk
					data={offices}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("office_id")}
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				px="sm"
				pt="sm"
				justify={{ sm: "center" }}
			>
				<PersianDatePicker
					label={t("start_date")}
					placeholder={t("start_date")}
					value={startDate}
					onChange={setStartDate}
					errorMessage={startDateErrorMessage}
				/>
				<PersianDatePicker
					label={t("end_date")}
					placeholder={t("end_date")}
					value={endDate}
					onChange={setEndDate}
					errorMessage={endDateErrorMessage}
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("cash_amount")}
					placeholder={t("cash_amount")}
					{...form.getInputProps("cash_amount")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("currency")}
					placeholder={t("currency")}
					data={currencies}
					clearable
					{...form.getInputProps("currency")}
				/>
			</Flex>
		</Box>
	);
};

export default CharityPackageStepOne;
