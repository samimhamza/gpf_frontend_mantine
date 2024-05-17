"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, Select } from "@mantine/core";

interface ExportStepOneProps {
  form: any;
  types: any;
  sizes: any;
  lng: string;
}

const ExportStepOne = ({ form, lng, types, sizes }: ExportStepOneProps) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap='sm'
        p='sm'
        justify={{ sm: "center" }}
      >
        <Select
          style={{ flex: 1 }}
          label={t("downloadType")}
          placeholder={t("downloadType")}
          withAsterisk
          data={types}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("downloadType")}
        />
        <Select
          style={{ flex: 1 }}
          label={t("downloadSize")}
          placeholder={t("downloadSize")}
          withAsterisk
          data={sizes}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("downloadSize")}
        />
      </Flex>
    </>
  );
};

export default ExportStepOne;
