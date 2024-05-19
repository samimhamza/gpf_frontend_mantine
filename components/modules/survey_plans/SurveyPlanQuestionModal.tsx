"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { HiMiniUsers } from "react-icons/hi2";
import SurveyPlanQuestionStepOne from "./SurveyPlanQuestionStepOne";
import { SurveyPlanQuestionsSchema } from "@/schemas/models/survey_plan_questions";

const SurveyPlanQuestionModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
  surveyId,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
  surveyId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const surveyPlanQuestionsSchema = SurveyPlanQuestionsSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [questions, SetQuestions] = useState([]);

  const initialValues: any = {
    questions: [],
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(surveyPlanQuestionsSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const data2 = form.values.questions.map((item: any, index: number) => {
      return { question_id: item, order: index + 1 };
    });
    try {
      const { data, status } = await callApi({
        method: "POST",
        url: `/survey_plans/${surveyId}/questions`,
        data: {
          questions: data2,
        },
      });

      if (status === 202) {
        toast.success("Questions added successfully");
      } else {
        toast.error("Failed to add questions");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("something_went_wrong"));
    }
  };

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_questions",
      });
      if (status == 200 && response.result == true) {
        SetQuestions(
          response.data.map((item: any) => {
            return {
              question_id: item.id,
              value: item.id.toString(),
              label: item.question,
            };
          })
        );
      }
    })();
  }, [callApi]);

  const steps = [
    {
      title: t("survey_plan_questions_info"),
      icon: <HiMiniUsers size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <SurveyPlanQuestionStepOne
            questions={questions}
            form={form}
            lng={lng}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid();
        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/teams/check_uniqueness",
            data: {
              name: form.values.name,
              office_id: form.values.office_id,
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
        editId={surveyId}
      />
    </form>
  );
};

export default SurveyPlanQuestionModal;
