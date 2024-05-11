import React, { useEffect, useState } from "react";
import { DateValue } from "@mantine/dates";
import PersianDatePicker from "../PersianDatePicker";
import { Box, Divider, Grid } from "@mantine/core";

interface DateRange {
  from?: DateValue;
  to?: DateValue;
}

interface FilterDateRangeProps {
  label: string;
  values: DateRange;
  changeHandler: (dateRange: DateRange) => void;
}

export default function FilterDateRange({
  label,
  values,
  changeHandler,
}: FilterDateRangeProps) {
  const [dateRange, setDateRange] = useState<DateRange>({});

  useEffect(() => {
    setDateRange(values);
  }, [values]);

  // Function to handle date range change
  const handleDateChange = (fieldName: keyof DateRange, date: DateValue) => {
    console.log(date);
    const newDateRange = { ...dateRange, [fieldName]: date };
    setDateRange(newDateRange);
    // Pass the updated date range back to the parent component
    changeHandler(newDateRange);
  };

  return (
    <div>
      <Box>{label}</Box>
      <Grid>
        <Grid.Col>
          <PersianDatePicker
            label="Start Date"
            value={dateRange.from}
            onChange={(date: any) => handleDateChange("from", date)}
            placeholder="Start Date"
          />
        </Grid.Col>
        <Grid.Col>
          <PersianDatePicker
            label="End Date"
            value={dateRange.to}
            onChange={(date: any) => {
              handleDateChange("to", date);
            }}
            placeholder="End Date"
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
