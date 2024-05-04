"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { HiMiniUsers } from "react-icons/hi2";
import useOffice from "@/customHooks/useOffice";
import SurveyPlanStepOne from "./SurveyPlanStepOne";
import { Value } from "react-multi-date-picker";
import { SurveyPlansSchema } from "@/schemas/models/survey_plans";
import { getTimeValue } from "@/shared/functions";

const SurveyPlansModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
  editId,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const surveyPlansSchema = SurveyPlansSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [employees, SetEmployees] = useState([]);
  const [startDate, setStartDate] = useState<Value>();
  const [endDate, setEndDate] = useState<Value>();
  const [startDateErrorMessage, setStartDateErrorMessage] = useState("");
  const [endDateErrorMessage, setEndDateErrorMessage] = useState("");
  const [provinces, setProvinces] = useState([]);
  // const [districts, setDistricts] = useState([]);

  const initialValues: any = {
    title: "",
    office_id: "",
    province_id: "",
    district_id: "",
    description: "",
    start_date: null,
    end_date: null,
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(surveyPlansSchema),
    validateInputOnBlur: true,
  });

  const { offices, office } = useOffice(form);

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/survey_plans",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/survey_plans/${editId}`,
          data: form.values,
        });
    if ((!editId ? status == 201 : status == 202) && response.result) {
      await setMutated(true);
      return true;
    }
    if (status == 422) {
      toast.error(t("editing_not_allowed"));
      close();
      return false;
    }
    toast.error(t("something_went_wrong"));
    return false;
  };

  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status, error } = await callApi({
          method: "GET",
          url: `/survey_plans/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          form.setValues({
            title: response?.data?.title,
            office_id: response?.data?.office_id.toString(),
            province_id: response?.data?.province_id?.toString(),
            district_id: response?.data?.district_id?.toString(),
            description: response?.data?.description,
            startDate: setStartDate(
              getTimeValue(response?.data?.start_date.toString())
            ),
            endDate: setEndDate(
              getTimeValue(response?.data?.end_date.toString())
            ),
          });
          setLoading(false);
        }
      })();
    }
  }, [editId]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_provinces",
      });
      if (status == 200 && response.result == true) {
        setProvinces(
          response.data.map((item: any) => {
            return { value: item.id.toString(), label: item.name_fa };
          })
        );
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async function () {
  //     const { response, status, error } = await callApi({
  //       method: "GET",
  //       url: "/all_districts",
  //     });
  //     if (status == 200 && response.result == true) {
  //       setDistricts(
  //         response.data.map((item: any) => {
  //           return { value: item.id.toString(), label: item.name_fa };
  //         })
  //       );
  //     }
  //   })();
  // }, []);

  const steps = [
    {
      title: t("survey_plan_info"),
      icon: <HiMiniUsers size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <SurveyPlanStepOne
            offices={offices}
            employees={employees}
            form={form}
            lng={lng}
            office={office}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDateErrorMessage={startDateErrorMessage}
            setStartDateErrorMessage={setStartDateErrorMessage}
            endDateErrorMessage={endDateErrorMessage}
            setEndDateErrorMessage={setEndDateErrorMessage}
            provinces={provinces}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid();
        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/survey_plans/check_uniqueness",
            data: {
              name: form.values.name,
              office_id: form.values.office_id,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              name: response.message == 0 && t("value_already_exists"),
            });
            return false;
          } else if (status !== 200) return false;
          return true;
        }
        return res;
      },
    },
  ];

  return (
    <form>
      <CustomModal
        opened={opened}
        close={close}
        steps={steps}
        form={form}
        submit={submit}
        lng={lng}
        title={title}
        editId={editId}
      />
    </form>
  );
};

export default SurveyPlansModal;
