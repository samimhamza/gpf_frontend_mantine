"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Select, TextInput } from "@mantine/core";

interface SchoolStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  office: string | null;
}

const SchoolStepOne = ({ form, lng, offices, office }: SchoolStepOneProps) => {
  const { t } = useTranslation(lng);
  const types = [
    { value: "elementary", label: t("elementary") },
    { value: "intermediate", label: t("intermediate") },
    { value: "high_school", label: t("high_school") },
  ];
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
          label={t("school_name")}
          placeholder={t("school_name")}
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("total_staff")}
          placeholder={t("total_staff")}
          min={0}
          withAsterisk
          {...form.getInputProps("total_staff")}
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
          label={t("head_name")}
          placeholder={t("head_name")}
          withAsterisk
          {...form.getInputProps("head_name")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("head_phone")}
          placeholder={t("head_phone")}
          {...form.getInputProps("head_phone")}
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
          label={t("school_type")}
          placeholder={t("school_type")}
          withAsterisk
          data={types}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("type")}
        />
        {office == "all" ? (
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
        ) : (
          <Box style={{ flex: 1 }}></Box>
        )}
      </Flex>
    </>
  );
};

export default SchoolStepOne;
