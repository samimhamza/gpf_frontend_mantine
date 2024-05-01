"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { getTime } from "@/shared/functions";
import { Flex, Select, Spoiler, Textarea, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Value } from "react-multi-date-picker";

interface SurveyPlanStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  employees: Array<{ value: string; label: string }>;
  office: string | null;
  startDate: Value | undefined;
  setStartDate: Dispatch<SetStateAction<Value | undefined>>;
  startDateErrorMessage: string;
  setStartDateErrorMessage: Dispatch<SetStateAction<string>>;
  endDate: Value | undefined;
  setEndDate: Dispatch<SetStateAction<Value | undefined>>;
  endDateErrorMessage: string;
  setEndDateErrorMessage: Dispatch<SetStateAction<string>>;
  districts: Array<{ value: string; label: string }>;
  provinces: Array<{ value: string; label: string }>;
  setDistricts: any;
}

const SurveyPlanStepOne = ({
  form,
  lng,
  offices,
  office,
  startDate,
  setStartDate,
  startDateErrorMessage,
  setStartDateErrorMessage,
  endDate,
  setEndDate,
  endDateErrorMessage,
  setEndDateErrorMessage,
  districts,
  setDistricts,
  provinces,
}: SurveyPlanStepOneProps) => {
  const { t } = useTranslation(lng);

  useEffect(() => {
    if (startDate) {
      setStartDateErrorMessage("");
      form.setFieldValue("start_date", getTime(startDate));
    } else {
      form.setFieldValue("start_date", null);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDateErrorMessage("");
      form.setFieldValue("end_date", getTime(endDate));
    } else {
      form.setFieldValue("end_date", null);
    }
  }, [endDate]);

  useEffect(() => {
    if (endDate && startDate) {
      if (endDate < startDate) {
        setEndDateErrorMessage(t("end_date_must_be_greater"));
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      {office == "all" && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          p="sm"
          justify={{ sm: "center" }}
        >
          <TextInput
            style={{ flex: 1 }}
            label={t("subject")}
            placeholder={t("subject")}
            withAsterisk
            {...form.getInputProps("title")}
          />
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
        </Flex>
      )}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        <Select
          style={{ flex: 1 }}
          label={t("provinces")}
          placeholder={t("provinces")}
          data={provinces}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("province_id")}
        />
        <Select
          style={{ flex: 1 }}
          label={t("districts")}
          placeholder={t("districts")}
          data={districts}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("district_id")}
        />
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
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

export default SurveyPlanStepOne;
