import React, { useEffect, useState } from "react";
import PersianDatePicker from "../PersianDatePicker";
import { Box, Grid } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface DateRange {
  from?: Date;
  to?: Date;
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

  const handleFromDateChange = (date: Date) => {
    const updatedRange = { ...dateRange, from: date };
    setDateRange(updatedRange);
    changeHandler(updatedRange);
  };

  const handleToDateChange = (date: Date) => {
    const updatedRange = { ...dateRange, to: date };
    setDateRange(updatedRange);
    changeHandler(updatedRange);
  };

  return (
    <div>
      <Box mb={5}>{label}</Box>
      <Grid>
        <Grid.Col>
          <PersianDatePicker
            value={dateRange.from}
            onChange={handleFromDateChange}
            placeholder={t("from_date")}
            isRequired={false}
          />
        </Grid.Col>
        <Grid.Col>
          <PersianDatePicker
            value={dateRange.to}
            onChange={handleToDateChange}
            placeholder={t("to_date")}
            isRequired={false}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
