"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import { ListType } from "@/types/list";
import { Box, Flex, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface TeamStepOneProps {
  form: any;
  lng: string;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<any[]>>;
  employees: ListType[];
  office: string | null;
}

const TeamStepOne = ({
  form,
  lng,
  offices,
  setOffices,
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
        <CustomAutoComplete
          style={{ flex: 1 }}
          lng={lng}
          label={t("members")}
          placeholder={t("members")}
          data={employees}
          url={`/employee/auto_complete`}
          values={form?.values?.members}
          withAsterisk
          isSingle={false}
          {...form.getInputProps("members")}
        />
      </Flex>
      {office == "all" && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          p="sm"
          justify={{ sm: "center" }}
        >
          <CustomAutoComplete
            style={{ flex: 1 }}
            lng={lng}
            label={t("office")}
            placeholder={t("office")}
            data={offices}
            setData={setOffices}
            url={`/office/auto_complete`}
            values={form?.values?.office_id}
            withAsterisk
            {...form.getInputProps("office_id")}
          />
          <Box style={{ flex: 1 }}></Box>
        </Flex>
      )}
    </>
  );
};

export default TeamStepOne;
