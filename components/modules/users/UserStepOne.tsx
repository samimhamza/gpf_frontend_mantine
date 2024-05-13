"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import Profile from "@/components/Profile";
import { ListType } from "@/types/list";
import { Box, Center, Flex, PasswordInput, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface UserStepOneProps {
  form: any;
  lng: string;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<ListType[]>>;
  editId: number | undefined;
  profileUrl: any;
  office: string | null;
}

const UserStepOne = ({
  form,
  lng,
  offices,
  setOffices,
  editId,
  profileUrl,
  office,
}: UserStepOneProps) => {
  const { t } = useTranslation(lng);

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
          label={t("full_name")}
          placeholder={t("full_name")}
          withAsterisk
          {...form.getInputProps("full_name")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("email")}
          placeholder={t("email")}
          withAsterisk
          {...form.getInputProps("email")}
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
          label={t("username")}
          placeholder={t("username")}
          withAsterisk
          {...form.getInputProps("username")}
        />
        {office == "all" ? (
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
        ) : (
          <Box style={{ flex: 1 }}></Box>
        )}
      </Flex>
      {!editId && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          p="sm"
          justify={{ sm: "center" }}
        >
          <PasswordInput
            style={{ flex: 1 }}
            label={t("password")}
            placeholder={t("password")}
            withAsterisk
            {...form.getInputProps("password")}
          />
          <PasswordInput
            style={{ flex: 1 }}
            label={t("confirm_password")}
            placeholder={t("confirm_password")}
            withAsterisk
            {...form.getInputProps("confirm_password")}
          />
        </Flex>
      )}
    </>
  );
};

export default UserStepOne;
