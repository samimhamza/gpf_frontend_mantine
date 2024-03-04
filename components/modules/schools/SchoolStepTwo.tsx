"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Flex, Loader, Select, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";

interface SchoolStepTwoProps {
	form: any;
	lng: string;
	provinces: any;
	editDistrict: string | undefined;
	setEditDistrict: any;
}

const SchoolStepTwo = ({
	form,
	lng,
	provinces,
	editDistrict,
	setEditDistrict,
}: SchoolStepTwoProps) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios({ method: "GET" });
	const [loading, setLoading] = useState(false);
	const [districts, setDistricts] = useState([]);

	useEffect(() => {
		(async function () {
			if (editDistrict) {
				form.setFieldValue("district_id", editDistrict);
				setEditDistrict("");
			} else {
				form.setFieldValue("district_id", null);
				setDistricts([]);
			}
			if (form?.values?.province_id) {
				setLoading(true);
				const { response, status, error } = await callApi({
					url: `/all_districts?province_id=${form?.values?.province_id}`,
				});
				if (status == 200 && response.result == true) {
					setDistricts(
						response.data.map((item: any) => {
							return { value: item.id.toString(), label: item.name_fa };
						})
					);
				}
				setLoading(false);
			}
		})();
	}, [form?.values?.province_id]);

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
					label={t("province")}
					placeholder={t("province")}
					withAsterisk
					data={provinces}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("province_id")}
				/>
				<Select
					disabled={districts.length < 1}
					style={{ flex: 1 }}
					label={t("district")}
					placeholder={t("district")}
					withAsterisk
					data={districts}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					rightSection={loading && <Loader color="blue" size={15} />}
					{...form.getInputProps("district_id")}
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
					label={t("address")}
					placeholder={t("address")}
					{...form.getInputProps("address")}
				/>
			</Flex>
		</>
	);
};

export default SchoolStepTwo;
