"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  Grid,
  NumberInput,
  Select,
  Textarea,
} from "@mantine/core";

interface InvoiceItemStepOneProps {
  form: any;
  lng: string;
  items: any;
}

const InvoiceItemStepOne = ({ form, lng, items }: InvoiceItemStepOneProps) => {
  const { t } = useTranslation(lng);

  const handleTotalPrice = (value: number, field: string) => {
    const { unit_price, quantity } = form.values;
    const quantityValue = field === "quantity" ? value : parseFloat(quantity);
    const unitPriceValue =
      field === "unit_price" ? value : parseFloat(unit_price);
    const calculatedTotalPrice = quantityValue * unitPriceValue;
    form.setFieldValue("total_price", calculatedTotalPrice);
  };

  const handleItemChange = (value: string | null) => {
    form.setFieldValue("item_id", value);
    const item = items.find((item: any) => item.value === value);
    form.setFieldValue("item_unit", item?.unit);
  };

  const handleInputChange = (value: number, field: string) => {
    form.setFieldValue(field, value);
    handleTotalPrice(value, field);
  };

  return (
    <>   
      <Grid gutter="sm" p="sm">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Select
            checkIconPosition="right"
            placeholder={t("item")}
            label={t("item")}
            data={items}
            onOptionSubmit={(value) => handleItemChange(value)}
            searchable
            clearable
            withAsterisk
            nothingFoundMessage={t("noting_found")}
            {...form.getInputProps("item_id")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <NumberInput
            placeholder={`${t("quantity")} (${
              form.values?.item_unit || t("unit")
            })`}
            label={`${t("quantity")} (${form.values?.item_unit || t("unit")})`}
            withAsterisk
            {...form.getInputProps("quantity")}
            onChange={(value) => handleInputChange(value as number, "quantity")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <NumberInput
            placeholder={`${t("unit_price")} (${
              form.values?.item_unit || t("unit")
            })`}
            label={`${t("unit_price")} (${
              form.values?.item_unit || t("unit")
            })`}
            {...form.getInputProps("unit_price")}
            onChange={(value) =>
              handleInputChange(value as number, "unit_price")
            }
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <NumberInput
            disabled
            placeholder={t("total_price")}
            label={t("total_price")}
            {...form.getInputProps("total_price")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label={t("remarks")}
            placeholder={t("remarks")}
            minRows={4}
            {...form.getInputProps("remarks")}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default InvoiceItemStepOne;
