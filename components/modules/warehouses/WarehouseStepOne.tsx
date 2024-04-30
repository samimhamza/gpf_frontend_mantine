"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Select, TextInput } from "@mantine/core";

interface WarehouseStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  provinces: Array<{ value: string; label: string }>;
  office: string | null;
}

const WarehouseStepOne = ({
  form,
  lng,
  offices,
  provinces,
  office,
}: WarehouseStepOneProps) => {
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
      </Flex>
      {office && (
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
        </Flex>
      )}
    </>
  );
};

export default WarehouseStepOne;
