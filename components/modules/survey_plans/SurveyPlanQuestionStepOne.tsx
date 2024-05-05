"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, MultiSelect } from "@mantine/core";
import { useState } from "react";

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
        <MultiSelect
          style={{ flex: 1 }}
          label={t("questions")}
          placeholder={t("questions")}
          withAsterisk
          data={questions}
          searchable
          clearable
          hidePickedOptions
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("questions")}
          size="sm"
          maxDropdownHeight={140}
        />
      </Flex>
    </>
  );
};

export default SurveyPlanQuestionStepOne;
