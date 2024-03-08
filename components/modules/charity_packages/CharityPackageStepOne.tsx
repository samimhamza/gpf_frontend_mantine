"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Input, Select, TextInput } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalali_fa from "@/jalali_fa";

interface CharityPackageStepOneProps {
	form: any;
	lng: string;
	offices: Array<{ value: string; label: string }>;
}

const CharityPackageStepOne = ({
	form,
	lng,
	offices,
}: CharityPackageStepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
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
				<TextInput
					style={{ flex: 1 }}
					label={t("name")}
					placeholder={t("name")}
					withAsterisk
					{...form.getInputProps("name")}
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
					label={t("period")}
					placeholder={t("period")}
					withAsterisk
					{...form.getInputProps("period")}
				/>
				<Box style={{ flex: 1 }}>
					<Box>
						<Input.Label required>{t("start_date")}</Input.Label>
					</Box>
					<Box style={{ display: "flex" }}>
						<DatePicker
							style={{
								width: "100%",
								boxSizing: "border-box",
								height: "36px",
								borderRadius: "4px",
							}}
							containerStyle={{ flex: 1 }}
							placeholder={t("start_date")}
							calendar={persian}
							locale={jalali_fa}
							calendarPosition="bottom-right"
							{...form.getInputProps("start_date")}
						/>
					</Box>
				</Box>
			</Flex>
		</>
	);
};

export default CharityPackageStepOne;
