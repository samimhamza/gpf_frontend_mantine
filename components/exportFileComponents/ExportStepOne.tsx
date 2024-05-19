"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, Select } from "@mantine/core";

interface ExportStepOneProps {
  form: any;
  formats: any;
  sizes: any;
  lng: string;
}

const ExportStepOne = ({ form, lng, formats, sizes }: ExportStepOneProps) => {
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
          label={t("download_format")}
          placeholder={t("download_format")}
          withAsterisk
          data={formats}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("downloadFormat")}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap='sm'
        p='sm'
        justify={{ sm: "center" }}
      >
        <Select
          style={{ flex: 1 }}
          label={t("download_size")}
          placeholder={t("download_size")}
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
