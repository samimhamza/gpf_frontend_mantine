"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, NumberInput, Select, TextInput } from "@mantine/core";

interface TeacherStepOneProps {
	form: any;
	lng: string;
	schools: Array<{ value: string; label: string }>;
}

const TeacherStepOne = ({ form, lng, schools }: TeacherStepOneProps) => {
	const { t } = useTranslation(lng);

	const staffTypes = [
		{ value: "formal_teacher", label: t("formal_teacher") },
		{ value: "informal_teacher", label: t("informal_teacher") },
		{ value: "school_employee", label: t("school_employee") },
	];

	const genders = [
		{ value: "male", label: t("male") },
		{ value: "female", label: t("female") },
	];

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
					label={t("first_name")}
					placeholder={t("first_name")}
					withAsterisk
					{...form.getInputProps("first_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("last_name")}
					placeholder={t("last_name")}
					withAsterisk
					{...form.getInputProps("last_name")}
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
					label={t("father_name")}
					placeholder={t("father_name")}
					withAsterisk
					{...form.getInputProps("father_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("phone")}
					placeholder={t("phone")}
					{...form.getInputProps("phone")}
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
					label={t("national_id")}
					placeholder={t("national_id")}
					{...form.getInputProps("national_id")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("school")}
					placeholder={t("school")}
					withAsterisk
					data={schools}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("school_id")}
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
					label={t("staff_type")}
					placeholder={t("staff_type")}
					withAsterisk
					data={staffTypes}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("staff_type")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("gender")}
					placeholder={t("gender")}
					withAsterisk
					data={genders}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("gender")}
				/>
			</Flex>
		</>
	);
};

export default TeacherStepOne;
