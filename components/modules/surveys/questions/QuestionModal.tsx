"use client";

import QuestionStepOne from "@/components/modules/surveys/questions/QuestionStepOne";
import { useForm, zodResolver } from "@mantine/form";
import {
  DescriptiveQuestionSchema,
  MultipleChoiceQuestionSchema,
} from "@/schemas/models/surveys/qustions";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import QuestionStepTwo from "./QuestionStepTwo";
import { IoIosListBox } from "react-icons/io";
import { FaClipboardQuestion } from "react-icons/fa6";

const QuestionModal = ({
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
  const descriptiveQuestionSchema = DescriptiveQuestionSchema(t);
  const multipleChoiceQuestionSchema = MultipleChoiceQuestionSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [formSchema, setFormSchema] = useState<any>(descriptiveQuestionSchema);
  const [fieldSetError, setFieldSetError] = useState(false);

  const initialValues: any = {
    question: "",
    code: "",
    type: "",
    parent_id: "",
    mark: "",
    choices: [{ id: "", answer: "", mark: "" }],
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(formSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/questions",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/questions/${editId}`,
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
          url: `/questions/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (key != "parent_id" && key != "choices" && key != "mark") {
                values[key] = value ? value : initialValues[key];
              } else if ((key == "parent_id" || key == "mark") && value) {
                values[key] = value.toString();
              } else if (key == "choices" && Array.isArray(value)) {
                values["choices"] = [];
                value.forEach((choice) => {
                  values["choices"].push({
                    id: choice?.id?.toString(),
                    answer: choice?.answer?.toString(),
                    mark: choice?.mark.toString(),
                  });
                });
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId, form, callApi, initialValues]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_questions",
      });
      if (status == 200 && response.result == true) {
        setQuestions(
          response.data.map((item: any) => {
            return {
              value: item.id.toString(),
              label: "(" + item.code + ") " + item.question,
            };
          })
        );
      }
    })();
  }, []);

  const stepOne = {
    title: t("question_details"),
    icon: <FaClipboardQuestion size={22} />,
    step: (
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <QuestionStepOne form={form} lng={lng} questions={questions} />
      </Box>
    ),
    async validate() {
      form.validate();
      let res =
        form.isValid("question") &&
        form.isValid("type") &&
        form.isValid("code") &&
        form.isValid("mark");
      if (res) {
        let { response, status } = await callApi({
          method: "POST",
          url: "/questions/check_uniqueness",
          data: {
            question: form.values.question,
            code: form.values.code,
            id: editId ? editId : null,
          },
        });
        if (status == 226) {
          form.setErrors({
            code:
              (response.message == 1 || response.message == 0) &&
              t("value_already_exists"),
            question:
              (response.message == 2 || response.message == 0) &&
              t("value_already_exists"),
          });
          return false;
        } else if (status !== 200) return false;
        return true;
      }
      return res;
    },
  };

  const stepTwo = {
    title: t("choices"),
    icon: <IoIosListBox size={22} />,
    step: (
      <QuestionStepTwo
        form={form}
        lng={lng}
        fieldSetError={fieldSetError}
        setFieldSetError={setFieldSetError}
      />
    ),
    async validate() {
      form.validate();
      let res = form.isValid("choices");
      return res;
    },
  };

  let steps = [stepOne];

  useEffect(() => {
    if (form.values?.type == "multiple_choice") {
      setFormSchema(multipleChoiceQuestionSchema);
      setShowSecondStep(true);
    } else {
      setFormSchema(descriptiveQuestionSchema);
      setShowSecondStep(false);
    }
  }, [form.values?.type]);

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
        dynamicStep={stepTwo}
        showDynamicStep={showSecondStep}
      />
    </form>
  );
};

export default QuestionModal;
