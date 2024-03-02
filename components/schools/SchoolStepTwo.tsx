"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Flex, Select, TextInput } from "@mantine/core";
import { useState } from "react";

interface SchoolStepTwoProps {
	form: any;
	lng: string;
	provinces: any;
	districts: any;
}

const SchoolStepTwo = ({
	form,
	lng,
	provinces,
	districts,
}: SchoolStepTwoProps) => {
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
					label={t("province")}
					placeholder={t("province")}
					withAsterisk
					data={provinces}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					// onSearchChange={handleSearch}
					// rightSection={loading && <Loader color="blue" size={15} />}
					{...form.getInputProps("province_id")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("district")}
					placeholder={t("district")}
					withAsterisk
					data={districts}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					// onSearchChange={handleSearch}
					// rightSection={loading && <Loader color="blue" size={15} />}
					{...form.getInputProps("district_id")}
				/>
			</Flex>
		</>
	);
};

export default SchoolStepTwo;
