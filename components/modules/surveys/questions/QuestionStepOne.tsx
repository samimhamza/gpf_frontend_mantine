"use client";

import { useTranslation } from "@/app/i18n/client";
import { QuestionTypes } from "@/shared/constants";
import { Box, Flex, Select, TextInput } from "@mantine/core";

interface QuestionStepOneProps {
  form: any;
  lng: string;
  questions: Array<{ value: string; label: string }>;
}

const QuestionStepOne = ({ form, lng, questions }: QuestionStepOneProps) => {
  const { t } = useTranslation(lng);
  const types = QuestionTypes(t);

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
          label={t("question")}
          placeholder={t("question")}
          withAsterisk
          {...form.getInputProps("question")}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t("code")}
          placeholder={t("code")}
          withAsterisk
          {...form.getInputProps("code")}
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
          label={t("type")}
          placeholder={t("type")}
          data={types}
          withAsterisk
          clearable
          {...form.getInputProps("type")}
        />
        <Select
          style={{ flex: 1 }}
          label={t("parent_question")}
          placeholder={t("parent_question")}
          data={questions}
          searchable
          clearable
          nothingFoundMessage={t("noting_found")}
          {...form.getInputProps("parent_id")}
        />
      </Flex>
      {form.values.type == "descriptive" && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap="sm"
          p="sm"
          justify={{ sm: "center" }}
        >
          <TextInput
            style={{ flex: 1 }}
            label={t("mark")}
            placeholder={t("mark")}
            type="number"
            withAsterisk
            {...form.getInputProps(`mark`)}
          />
          <Box style={{ flex: 1 }}></Box>
        </Flex>
      )}
    </>
  );
};

export default QuestionStepOne;
