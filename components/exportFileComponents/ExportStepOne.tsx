"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, Select } from "@mantine/core";

interface ExportStepOneProps {
  form: any;
  lng: string;
}

const ExportStepOne = ({
  form,
  lng,
}: ExportStepOneProps) => {
  const { t } = useTranslation(lng);
  const types = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "excel" },
  ];
  const sizes = [
    { label: "Current Page Data", value: "current" },
    { label: "Current Filter Data", value: "filtered" },
    { label: "All Data", value: "all" },
  ];

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
