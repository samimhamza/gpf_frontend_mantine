"use client";

import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { getTime } from "@/shared/functions";
import { Flex, Loader, Select, Textarea, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Value } from "react-multi-date-picker";
import { useAxios } from "@/customHooks/useAxios";
import { ListType } from "@/types/list";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";

interface SurveyPlanStepOneProps {
  form: any;
  lng: string;
  offices: ListType[];
  setOffices: Dispatch<SetStateAction<ListType[]>>;
  employees: ListType[];
  office: string | null;
  startDate: Value | undefined;
  setStartDate: Dispatch<SetStateAction<Value | undefined>>;
  startDateErrorMessage: string;
  setStartDateErrorMessage: Dispatch<SetStateAction<string>>;
  endDate: Value | undefined;
  setEndDate: Dispatch<SetStateAction<Value | undefined>>;
  endDateErrorMessage: string;
  setEndDateErrorMessage: Dispatch<SetStateAction<string>>;
  provinces: ListType[];
}

const SurveyPlanStepOne = ({
  form,
  lng,
  offices,
  setOffices,
  office,
  startDate,
  setStartDate,
  startDateErrorMessage,
  setStartDateErrorMessage,
  endDate,
  setEndDate,
  endDateErrorMessage,
  setEndDateErrorMessage,
  provinces,
}: SurveyPlanStepOneProps) => {
  const { t } = useTranslation(lng);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const callApi = useAxios();

  useEffect(() => {
    if (startDate) {
      setStartDateErrorMessage("");
      form.setFieldValue("start_date", getTime(startDate));
    } else {
      form.setFieldValue("start_date", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDateErrorMessage("");
      form.setFieldValue("end_date", getTime(endDate));
    } else {
      form.setFieldValue("end_date", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  useEffect(() => {
    if (endDate && startDate) {
      if (endDate < startDate) {
        setEndDateErrorMessage(t("end_date_must_be_greater"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    (async function () {
      if (form?.values?.province_id) {
        form.setValues({ district_id: null });
        setLoading(true);
        const { response, status, error } = await callApi({
          method: "GET",
          url: `/all_districts?province_id=${form?.values?.province_id}`,
        });
        if (status == 200 && response.result == true) {
          setDistricts(
            response.data.map((item: any) => {
              return { value: item.id.toString(), label: item.name_fa };
            })
          );
        }
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form?.values?.province_id]);

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
          label={t("subject")}
          placeholder={t("subject")}
          withAsterisk
          {...form.getInputProps("title")}
        />
        {office == "all" && (
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
        )}
      </Flex>
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
          disabled={districts.length < 1}
          style={{ flex: 1 }}
          label={t("districts")}
          placeholder={t("districts")}
          data={districts}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          rightSection={loading && <Loader color="primary" size={15} />}
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
