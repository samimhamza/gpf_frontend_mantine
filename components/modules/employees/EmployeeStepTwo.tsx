"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { Flex, TextInput, Textarea } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Value } from "react-multi-date-picker";

interface EmployeeStepTwoProps {
  form: any;
  lng: string;
  startDateErrorMessage: string;
  setStartDateErrorMessage: Dispatch<SetStateAction<string>>;
  endDateErrorMessage: string;
  setEndDateErrorMessage: Dispatch<SetStateAction<string>>;
  startDate: Value | undefined;
  setStartDate: Dispatch<SetStateAction<Value | undefined>>;
  endDate: Value | undefined;
  setEndDate: Dispatch<SetStateAction<Value | undefined>>;
}

const EmployeeStepTwo = ({
  form,
  lng,
  startDateErrorMessage,
  setStartDateErrorMessage,
  endDateErrorMessage,
  setEndDateErrorMessage,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: EmployeeStepTwoProps) => {
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
          label={t("email")}
          placeholder={t("email")}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("phone")}
          placeholder={t("phone")}
          withAsterisk
          {...form.getInputProps("phone")}
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
          label={t("job_title")}
          placeholder={t("job_title")}
          withAsterisk
          {...form.getInputProps("job_title")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("salary")}
          placeholder={t("salary")}
          withAsterisk
          {...form.getInputProps("salary")}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        px="sm"
        pt="sm"
        justify={{ sm: "center" }}
      >
        <PersianDatePicker
          label={t("start_date")}
          placeholder={t("start_date")}
          value={startDate}
          onChange={setStartDate}
          errorMessage={startDateErrorMessage}
        />
        <PersianDatePicker
          label={t("end_date")}
          placeholder={t("end_date")}
          value={endDate}
          onChange={setEndDate}
          errorMessage={endDateErrorMessage}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        <Textarea
          resize="vertical"
          style={{ flex: 1 }}
          label={t("description")}
          placeholder={t("description")}
          {...form.getInputProps("description")}
        />
      </Flex>
    </>
  );
};

export default EmployeeStepTwo;
