"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Genders, StaffTypes, SurveyTypes } from "@/shared/constants";
import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { useEffect } from "react";

interface TeacherStepTwoProps {
	form: any;
	lng: string;
	districts: Array<{ value: string; label: string }>;
	schools: Array<{
		group: string;
		items: Array<{ value: string; label: string }>;
	}>;
	provinces: Array<{ value: string; label: string }>;
	setDistricts: any;
}

const TeacherStepTwo = ({
	form,
	lng,
	districts,
	schools,
	provinces,
	setDistricts,
}: TeacherStepTwoProps) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();

	const types = SurveyTypes(t);
	const staffTypes = StaffTypes(t);
	const genders = Genders(t);

	useEffect(() => {
		(async function () {
			if (form.values.school_id) {
				schools.forEach((item) => {
					item.items.forEach(async (school) => {
						if (school.value == form.values.school_id) {
							const prov = provinces.find(
								(province) => province.label == item.group
							);
							if (prov?.value) {
								form.setFieldValue("current_residence_id", prov.value);
								const { response, status, error } = await callApi({
									method: "GET",
									url: `/all_districts?province_id=${prov.value}`,
								});
								if (status == 200 && response.result == true) {
									setDistricts(
										response.data.map((item: any) => {
											return { value: item.id.toString(), label: item.name_fa };
										})
									);
								}
							}
						}
					});
				});
			}
		})();
	}, [form.values.school_id, schools]);

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
					label={t("national_id")}
					placeholder={t("national_id")}
					{...form.getInputProps("national_id")}
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
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
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
			</Flex>
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
					data={types}
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
