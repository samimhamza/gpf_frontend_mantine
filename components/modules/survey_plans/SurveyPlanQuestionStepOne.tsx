"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomAutoComplete from "@/components/Design/CustomAutoComplete";
import { Flex } from "@mantine/core";

interface SurveyPlanQuestionStepOneProps {
  form: any;
  lng: string;
  questions: Array<{ value: string; label: string; question_id: string }>;
}

const SurveyPlanQuestionStepOne = ({
  form,
  lng,
  questions,
}: SurveyPlanQuestionStepOneProps) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        <CustomAutoComplete
          style={{ flex: 1 }}
          lng={lng}
          label={t("questions")}
          placeholder={t("questions")}
          data={questions}
          url={`/question/auto_complete`}
          values={form?.values?.questions}
          withAsterisk
          isSingle={false}
          {...form.getInputProps("questions")}
        />
      </Flex>
    </>
  );
};

export default SurveyPlanQuestionStepOne;
