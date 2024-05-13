"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import { ListType } from "@/types/list";
import { Flex, Select, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface WarehouseStepOneProps {
  form: any;
  lng: string;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<ListType[]>>;
  provinces: ListType[];
  office: string | null;
}

const WarehouseStepOne = ({
  form,
  lng,
  offices,
  setOffices,
  provinces,
  office,
}: WarehouseStepOneProps) => {
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
        <Select
          style={{ flex: 1 }}
          label={t("province")}
          placeholder={t("province")}
          withAsterisk
          data={provinces}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("province_id")}
        />
      </Flex>
      {office && (
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
            withAsterisk
            {...form.getInputProps("office_id")}
          />
        </Flex>
      )}
    </>
  );
};

export default WarehouseStepOne;
