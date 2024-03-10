"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Input, Select, TextInput } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalali_fa from "@/jalali_fa";
import { Dispatch, SetStateAction } from "react";
import type { Value } from "react-multi-date-picker";

interface CharityPackageStepOneProps {
	form: any;
	lng: string;
	offices: Array<{ value: string; label: string }>;
	dateError: boolean;
	startEndDates: Value;
	setStartEndDates: Dispatch<SetStateAction<Value>>;
}

const CharityPackageStepOne = ({
	form,
	lng,
	offices,
	dateError,
	startEndDates,
	setStartEndDates,
}: CharityPackageStepOneProps) => {
	const { t } = useTranslation(lng);
	const currencies = [
		{ value: "afn", label: t("afn") },
		{ value: "usd", label: t("usd") },
	];

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
					label={t("office")}
					placeholder={t("office")}
					withAsterisk
					data={offices}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("office_id")}
				/>
				<Box style={{ flex: 1 }}>
					<Box>
						<Input.Label required>{t("date_range")}</Input.Label>
					</Box>
					<Box style={{ display: "flex" }}>
						<DatePicker
							value={startEndDates}
							onChange={setStartEndDates}
							range
							dateSeparator=" - "
							zIndex={1000}
							portal
							style={{
								width: "100%",
								boxSizing: "border-box",
								height: "36px",
								borderRadius: "4px",
							}}
							containerStyle={{ flex: 1 }}
							placeholder={t("date_range")}
							calendar={persian}
							locale={jalali_fa}
							calendarPosition="bottom-right"
						/>
					</Box>
					{dateError && (
						<Box pt={3}>
							<Input.Error>{t("field_required")}</Input.Error>
						</Box>
					)}
				</Box>
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
