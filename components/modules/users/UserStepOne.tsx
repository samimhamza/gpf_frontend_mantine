"use client";

import { useTranslation } from "@/app/i18n/client";
import Profile from "@/components/Profile";
import { useAxios } from "@/customHooks/useAxios";
import {
  Box,
  Center,
  Flex,
  Loader,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

interface UserStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  editId: number | undefined;
  profileUrl: any;
  office: string | null;
}

const UserStepOne = ({
  form,
  lng,
  offices,
  editId,
  profileUrl,
  office,
}: UserStepOneProps) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);

  // const handleSearch = async (value: string) => {
  // 	setLoading(true);
  // 	const { response, status, error } = await callApi({
  //		method: "GET",
  // 		url: `/office/auto_complete?name=${value}`,
  // 	});
  // 	if (status == 200 && response.result == true) {
  // 		setOffices(
  // 			response.data.map((item: any) => {
  // 				return { value: item.id.toString(), label: item.name };
  // 			})
  // 		);
  // 	}
  // 	setLoading(false);
  // };

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
        <PasswordInput
          style={{ flex: 1 }}
          label={t("password")}
          placeholder={t("password")}
          withAsterisk
          {...form.getInputProps("password")}
        />
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
            label={t("confirm_password")}
            placeholder={t("confirm_password")}
            withAsterisk
            {...form.getInputProps("confirm_password")}
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
              // onSearchChange={handleSearch}
              // rightSection={loading && <Loader color="primary" size={15} />}
              {...form.getInputProps("office_id")}
            />
          ) : (
            <Box style={{ flex: 1 }}></Box>
          )}
        </Flex>
      )}
    </>
  );
};

export default UserStepOne;
