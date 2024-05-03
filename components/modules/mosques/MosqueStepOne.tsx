"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Flex, Select, TextInput } from "@mantine/core";
import { useState } from "react";

interface MosqueStepOneProps {
  form: any;
  lng: string;
  offices: any;
  provinces: any;
  districts: any;
  office: string | null;
}

const MosqueStepOne = ({
  form,
  lng,
  offices,
  provinces,
  districts,
  office,
}: MosqueStepOneProps) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);

  // const handleSearch = async (value: string) => {
  // 	setLoading(true);
  // 	const { response, status, error } = await callApi({
  //    method: "GET",
  // 		url: `/office/auto_complete?name=${value}`,
  // 	});
  // 	if (status == 200 && response.result == true) {
  // 		setOffices(
  // 			response.data.map((item: any) => {
  // 				return { value: item.id.toString(), label: item.name };
  // 			})
  // 		);
  // 	}
  // 	setLoading(false);
  // };
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
          label={t("name")}
          placeholder={t("name")}
          withAsterisk
          {...form.getInputProps("name")}
        />
        {office == "all" && (
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
        )}
      </Flex>
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
          style={{ flex: 1 }}
          label={t("district")}
          placeholder={t("district")}
          withAsterisk
          data={districts}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("district_id")}
        />
      </Flex>
    </>
  );
};

export default MosqueStepOne;
