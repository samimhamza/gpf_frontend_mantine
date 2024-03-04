"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, NumberInput, Select, TextInput } from "@mantine/core";

interface TeacherStepOneProps {
	form: any;
	lng: string;
	offices: any;
}

const TeacherStepOne = ({ form, lng, offices }: TeacherStepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("school_name")}
					placeholder={t("school_name")}
					withAsterisk
					{...form.getInputProps("name")}
				/>
				<NumberInput
					style={{ flex: 1 }}
					label={t("total_staff")}
					placeholder={t("total_staff")}
					min={0}
					withAsterisk
					{...form.getInputProps("total_staff")}
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
					label={t("head_name")}
					placeholder={t("head_name")}
					withAsterisk
					{...form.getInputProps("head_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("head_phone")}
					placeholder={t("head_phone")}
					{...form.getInputProps("head_phone")}
				/>
			</Flex>
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
					// onSearchChange={handleSearch}
					// rightSection={loading && <Loader color="blue" size={15} />}
					{...form.getInputProps("office_id")}
				/>
			</Flex>
		</>
	);
};

export default TeacherStepOne;
