"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  ActionIcon,
  Box,
  Fieldset,
  Flex,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

interface QuestionStepTwoProps {
  form: any;
  lng: string;
  fieldSetError: boolean;
  setFieldSetError: (error: boolean) => void;
}

const QuestionStepTwo = ({
  form,
  lng,
  fieldSetError,
  setFieldSetError,
}: QuestionStepTwoProps) => {
  const { t } = useTranslation(lng);

  return (
    <Box>
      <Fieldset m="sm" legend={t("choices")}>
        {form.values.choices.map(
          (
            item: {
              id: string | number;
              answer: string;
              mark: string;
            },
            index: number
          ) => (
            <Box key={index}>
              <Flex gap="sm" pt="sm" justify={{ sm: "flex-end" }}>
                {index == 0 && (
                  <ActionIcon
                    onClick={() =>
                      form.insertListItem("choices", {
                        id: "",
                        answer: "",
                        mark: "",
                      })
                    }
                  >
                    <IoAddCircle size="1.5rem" />
                  </ActionIcon>
                )}
                {form.values.choices.length > 1 && (
                  <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem("choices", index)}
                  >
                    <FaTrashAlt size="1rem" />
                  </ActionIcon>
                )}
              </Flex>
              <Flex
                direction={{ base: "column", sm: "row" }}
                gap="sm"
                align={{ sm: "center" }}
              >
                <Textarea
                  resize="vertical"
                  style={{ flex: 1 }}
                  label={t("answer") + " : " + (index + 1)}
                  placeholder={t("answer")}
                  withAsterisk
                  {...form.getInputProps(`choices.${index}.answer`)}
                />
                <TextInput
                  style={{ flex: 1 }}
                  label={t("mark")}
                  placeholder={t("mark")}
                  type="number"
                  withAsterisk
                  {...form.getInputProps(`choices.${index}.mark`)}
                />
              </Flex>
            </Box>
          )
        )}
      </Fieldset>
      {fieldSetError && <Text>{t("two_choices_are_required")}</Text>}
    </Box>
  );
};

export default QuestionStepTwo;
