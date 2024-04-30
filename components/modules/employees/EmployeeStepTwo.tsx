"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { Currencies } from "@/shared/constants";
import { getTime } from "@/shared/functions";
import { Flex, Select, TextInput, Textarea } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  const currencies = Currencies(t);

  useEffect(() => {
    if (startDate) {
      setStartDateErrorMessage("");
      form.setFieldValue("start_date", getTime(startDate));
    } else {
      form.setFieldValue("start_date", null);
    }
  }, [startDate, form, setStartDateErrorMessage]);

  useEffect(() => {
    setEndDateErrorMessage("");
    if (endDate) {
      form.setFieldValue("end_date", getTime(endDate));
    } else {
      form.setFieldValue("end_date", null);
    }
  }, [endDate, form, setEndDateErrorMessage]);

  useEffect(() => {
    if (endDate && startDate) {
      if (endDate < startDate) {
        setEndDateErrorMessage(t("end_date_must_be_greater"));
      }
    }
  }, [startDate, endDate, setEndDateErrorMessage, t]);

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
        <PersianDatePicker
          label={t("start_date")}
          placeholder={t("start_date")}
          value={startDate}
          onChange={setStartDate}
          errorMessage={startDateErrorMessage}
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
          label={t("end_date")}
          placeholder={t("end_date")}
          value={endDate}
          onChange={setEndDate}
          errorMessage={endDateErrorMessage}
          isRequired={false}
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
        p="sm"
        justify={{ sm: "center" }}
      >
        <Select
          style={{ flex: 1 }}
          label={t("currency")}
          placeholder={t("currency")}
          data={currencies}
          withAsterisk
          clearable
          {...form.getInputProps("currency")}
        />
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
