import React, { useEffect, useState, useTransition } from "react";
import { DateValue } from "@mantine/dates";
import PersianDatePicker from "../PersianDatePicker";
import { Box, Grid } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface DateRange {
  from?: DateValue;
  to?: DateValue;
}

interface FilterDateRangeProps {
  label: string;
  values: DateRange;
  changeHandler: (dateRange: DateRange) => void;
  lng: string;
}

export default function FilterDateRange({
  label,
  values,
  changeHandler,
  lng,
}: FilterDateRangeProps) {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const { t } = useTranslation(lng);

  useEffect(() => {
    setDateRange(values);
  }, [values]);

  const handleDateChange = (fieldName: keyof DateRange, date: DateValue) => {
    console.log(date);
    const newDateRange = { ...dateRange, [fieldName]: date };
    setDateRange(newDateRange);
    changeHandler(newDateRange);
  };

  return (
    <div>
      <Box mb={5}>{label}</Box>
      <Grid>
        <Grid.Col>
          <PersianDatePicker
            value={dateRange.from}
            onChange={(date: any) => handleDateChange("from", date)}
            placeholder={t("from_date")}
            isRequired={false}
          />
        </Grid.Col>
        <Grid.Col>
          <PersianDatePicker
            value={dateRange.to}
            onChange={(date: any) => {
              handleDateChange("to", date);
            }}
            placeholder={t("to_date")}
            isRequired={false}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
