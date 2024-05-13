"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import { ListType } from "@/types/list";
import { Flex, Select, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface MosqueStepOneProps {
  form: any;
  lng: string;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<ListType[]>>;
  provinces: any;
  districts: any;
  office: string | null;
}

const MosqueStepOne = ({
  form,
  lng,
  offices,
  setOffices,
  provinces,
  districts,
  office,
}: MosqueStepOneProps) => {
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
          label={t("name")}
          placeholder={t("name")}
          withAsterisk
          {...form.getInputProps("name")}
        />
        {office == "all" && (
          <CustomAutoComplete
            style={{ flex: 1 }}
            lng={lng}
            label={t("office")}
            placeholder={t("office")}
            data={offices}
            setData={setOffices}
            url={`/office/auto_complete`}
            values={form?.values?.office_id}
            withAsterisk
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
