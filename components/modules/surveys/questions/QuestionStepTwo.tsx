"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  ActionIcon,
  Box,
  Fieldset,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

interface QuestionStepTwoProps {
  form: any;
  lng: string;
}

const QuestionStepTwo = ({ form, lng }: QuestionStepTwoProps) => {
  const { t } = useTranslation(lng);

  return (
    <Box>
      <Fieldset m="sm" legend={t("question_choices")}>
        {form.values.choices.map(
          (
            item: {
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
                justify={{ sm: "center" }}
              >
                <TextInput
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
    </Box>
  );
};

export default QuestionStepTwo;
