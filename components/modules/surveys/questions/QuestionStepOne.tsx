"use client";

import { useTranslation } from "@/app/i18n/client";
import { QuestionTypes } from "@/shared/constants";
import { ListType } from "@/types/list";
import { Box, Flex, Select, TextInput, Textarea } from "@mantine/core";

interface QuestionStepOneProps {
  form: any;
  lng: string;
  questions: ListType[];
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
        <Textarea
          resize="vertical"
          style={{ flex: 1 }}
          label={t("question")}
          placeholder={t("question")}
          withAsterisk
          {...form.getInputProps("question")}
        />
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        px="sm"
        justify={{ sm: "center" }}
      >
        <TextInput
          style={{ flex: 1 }}
          label={t("code")}
          placeholder={t("code")}
          withAsterisk
          {...form.getInputProps("code")}
        />
        <Select
          style={{ flex: 1 }}
          label={t("type")}
          placeholder={t("type")}
          data={types}
          withAsterisk
          clearable
          {...form.getInputProps("type")}
        />
      </Flex>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="sm"
        p="sm"
        justify={{ sm: "center" }}
      >
        {form.values.type == "descriptive" && (
          <TextInput
            style={{ flex: 1 }}
            label={t("mark")}
            placeholder={t("mark")}
            type="number"
            withAsterisk
            {...form.getInputProps(`mark`)}
          />
        )}
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
        {form.values.type != "descriptive" && <Box style={{ flex: 1 }}></Box>}
      </Flex>
    </>
  );
};

export default QuestionStepOne;
