"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import Profile from "@/components/Profile";
import { Genders } from "@/shared/constants";
import { ListType } from "@/types/list";
import { Center, Flex, Select, TextInput, Textarea } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface EmployeeStepOneProps {
  form: any;
  lng: string;
  profileUrl: any;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<ListType[]>>;
  office: string | null;
}

const EmployeeStepOne = ({
  form,
  lng,
  profileUrl,
  offices,
  setOffices,
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
          <CustomAutoComplete
            style={{ flex: 1 }}
            lng={lng}
            label={t("office")}
            placeholder={t("office")}
            data={offices}
            setData={setOffices}
            url={`/office/auto_complete`}
            withAsterisk
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
