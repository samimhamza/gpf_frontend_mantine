"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  ActionIcon,
  Box,
  Fieldset,
  Flex,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

interface CharityPackageStepTwoProps {
  form: any;
  lng: string;
  items: Array<{
    value: string;
    label: string;
    unit: string;
  }>;
}

const CharityPackageStepTwo = ({
  form,
  lng,
  items,
}: CharityPackageStepTwoProps) => {
  const { t } = useTranslation(lng);

  return (
    <Box>
      {form.values.items.length == 0 && (
        <>
          <Flex gap="sm" p="sm" justify={{ sm: "center" }}>
            <ActionIcon
              onClick={() =>
                form.insertListItem("items", {
                  item_id: "",
                  quantity: "",
                  unit: "",
                })
              }
            >
              <IoAddCircle size="1.5rem" />
            </ActionIcon>
          </Flex>
          <Text c="dimmed" ta="center">
            {t("no_items_exists")}
          </Text>
        </>
      )}
      {form.values.items.map(
        (
          item: {
            item_id: string;
            quantity: string;
            unit: string;
          },
          index: number
        ) => (
          <Box p="sm" key={index}>
            <Flex gap="sm" px="sm" justify={{ sm: "flex-end" }}>
              {form.values.items.length - 1 == index && (
                <ActionIcon
                  onClick={() =>
                    form.insertListItem("items", {
                      item_id: "",
                      quantity: "",
                      unit: "",
                    })
                  }
                >
                  <IoAddCircle size="1.5rem" />
                </ActionIcon>
              )}
              <ActionIcon
                color="red"
                onClick={() => form.removeListItem("items", index)}
              >
                <FaTrashAlt size="1rem" />
              </ActionIcon>
            </Flex>
            <Fieldset legend={t("package_items")}>
              <Flex
                px="sm"
                direction={{ base: "column", sm: "row" }}
                gap="sm"
                pt="sm"
                justify={{ sm: "center" }}
              >
                <Select
                  style={{ flex: 1 }}
                  label={t("item")}
                  placeholder={t("item")}
                  withAsterisk
                  data={items}
                  searchable
                  clearable
                  nothingFoundMessage={t("noting_found")}
                  {...form.getInputProps(`items.${index}.item_id`)}
                  onChange={(value) => {
                    form.setFieldValue(`items.${index}.item_id`, value);
                    let item = items.find((item) => item.value == value);
                    form.setFieldValue(`items.${index}.unit`, item?.unit);
                  }}
                />
                <TextInput
                  style={{ flex: 1 }}
                  label={t("quantity")}
                  placeholder={t("quantity")}
                  withAsterisk
                  {...form.getInputProps(`items.${index}.quantity`)}
                />
              </Flex>
              <Flex
                px="sm"
                direction={{ base: "column", sm: "row" }}
                gap="sm"
                pt="sm"
                justify={{ sm: "center" }}
              >
                <TextInput
                  disabled
                  style={{ flex: 1 }}
                  label={t("unit")}
                  placeholder={t("unit")}
                  withAsterisk
                  {...form.getInputProps(`items.${index}.unit`)}
                />
                <Box style={{ flex: 1 }}></Box>
              </Flex>
            </Fieldset>
          </Box>
        )
      )}
    </Box>
  );
};

export default CharityPackageStepTwo;
