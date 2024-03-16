"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Genders, StaffTypes } from "@/shared/constants";
import { Flex, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";

interface TeacherStepOneProps {
	form: any;
	lng: string;
	schools: Array<{
		group: string;
		items: Array<{ value: string; label: string }>;
	}>;
	provinces: Array<{ value: string; label: string }>;
	setDistricts: any;
}

const TeacherStepOne = ({
	form,
	lng,
	schools,
	provinces,
	setDistricts,
}: TeacherStepOneProps) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
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
					label={t("first_name")}
					placeholder={t("first_name")}
					withAsterisk
					{...form.getInputProps("first_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("last_name")}
					placeholder={t("last_name")}
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
