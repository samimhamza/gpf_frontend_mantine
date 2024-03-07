"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, Select, Textarea } from "@mantine/core";

interface TeacherStepTwoProps {
	form: any;
	lng: string;
	provinces: any;
	districts: Array<{ value: string; label: string }>;
}

const TeacherStepTwo = ({
	form,
	lng,
	provinces,
	districts,
}: TeacherStepTwoProps) => {
	const { t } = useTranslation(lng);
	const surveyTypes = [
		{ value: "survey", label: t("survey") },
		{ value: "without_survey", label: t("without_survey") },
	];

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
					label={t("main_residence")}
					placeholder={t("main_residence")}
					data={provinces}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("main_residence_id")}
				/>
				<Select
					disabled
					style={{ flex: 1 }}
					label={t("current_residence")}
					placeholder={t("current_residence")}
					data={provinces}
					withAsterisk
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("current_residence_id")}
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
					label={t("current_district")}
					placeholder={t("district")}
					data={districts}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("district_id")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("survey_type")}
					placeholder={t("survey_type")}
					withAsterisk
					data={surveyTypes}
					clearable
					{...form.getInputProps("type")}
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
				<Textarea
					resize="vertical"
					style={{ flex: 1 }}
					label={t("description")}
					placeholder={t("description")}
					{...form.getInputProps("description")}
				/>
				<Textarea
					resize="vertical"
					style={{ flex: 1 }}
					label={t("address")}
					placeholder={t("address")}
					{...form.getInputProps("address")}
				/>
			</Flex>
		</>
	);
};

export default TeacherStepTwo;
