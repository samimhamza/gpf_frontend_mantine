"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, MultiSelect, Select, TextInput } from "@mantine/core";

interface TeamStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  employees: Array<{ value: string; label: string }>;
  office: string | null;
}

const TeamStepOne = ({
  form,
  lng,
  offices,
  employees,
  office,
}: TeamStepOneProps) => {
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
      </Flex>
      {office == "all" && (
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
            // onSearchChange={handleSearch}
            // rightSection={loading && <Loader color="primary" size={15} />}
            {...form.getInputProps("office_id")}
          />
        </Flex>
      )}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        <MultiSelect
          style={{ flex: 1 }}
          label={t("team")}
          placeholder={t("team")}
          withAsterisk
          data={employees}
          searchable
          clearable
          hidePickedOptions
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("members")}
          size="sm"
          maxDropdownHeight={140}
        />
      </Flex>
    </>
  );
};

export default TeamStepOne;
