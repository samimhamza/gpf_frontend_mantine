"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import { useAxios } from "@/customHooks/useAxios";
import {
  Autocomplete,
  Box,
  ComboboxItem,
  Flex,
  Loader,
  MultiSelect,
  OptionsFilter,
  Select,
  SelectProps,
  TextInput,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TeamStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  setOffices: Dispatch<SetStateAction<never[]>>;
  employees: Array<{ value: string; label: string }>;
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
  const callApi = useAxios();
  // const [searchValue, setSearchValue] = useState("");
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let index = offices.findIndex((item) => item.label == searchValue);
  //   if (index == -1) {
  //     (async () => {
  //       setLoading(true);
  //       const { response, status } = await callApi({
  //         method: "GET",
  //         url: `/office/auto_complete`,
  //         params: {
  //           name: searchValue,
  //         },
  //       });
  //       if (status == 200 && response.result == true) {
  //         setOffices(
  //           response.data.map((item: any) => {
  //             return {
  //               value: item.id.toString(),
  //               label: item.name + " (" + item.code + ")",
  //             };
  //           })
  //         );
  //       }
  //       setLoading(false);
  //     })();
  //   }
  // }, [searchValue]);

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
        <MultiSelect
          style={{ flex: 1 }}
          label={t("members")}
          placeholder={t("members")}
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
            columnName="name"
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
