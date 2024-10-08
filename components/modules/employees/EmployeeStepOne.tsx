"use client";

import { useTranslation } from "@/app/i18n/client";
import Profile from "@/components/Profile";
import { Genders } from "@/shared/constants";
import { Center, Flex, Select, TextInput, Textarea } from "@mantine/core";

interface EmployeeStepOneProps {
  form: any;
  lng: string;
  profileUrl: any;
  offices: Array<{ value: string; label: string }>;
  office: string | null;
}

const EmployeeStepOne = ({
  form,
  lng,
  profileUrl,
  offices,
  office,
}: EmployeeStepOneProps) => {
  const { t } = useTranslation(lng);
  const genders = Genders(t);

  return (
    <>
      <Center p="sm">
        <Profile
          lng={lng}
          profileUrl={profileUrl}
          name="profile"
          form={form}
          title={t("profile")}
        />
      </Center>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        <TextInput
          style={{ flex: 1 }}
          label={t("first_name")}
          placeholder={t("first_name")}
          withAsterisk
          {...form.getInputProps("first_name")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("last_name")}
          placeholder={t("last_name")}
          withAsterisk
          {...form.getInputProps("last_name")}
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
          label={t("father_name")}
          placeholder={t("father_name")}
          withAsterisk
          {...form.getInputProps("father_name")}
        />
        <Select
          style={{ flex: 1 }}
          label={t("gender")}
          placeholder={t("gender")}
          withAsterisk
          data={genders}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("gender")}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
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

export default EmployeeStepOne;
