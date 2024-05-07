import React, { useEffect, useState } from "react";
import { DateValue } from "@mantine/dates";
import PersianDatePicker from "../PersianDatePicker";

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

  return (
    <div>
      <div>{label}</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <PersianDatePicker
          label="Start Date"
          value={dateRange.from ?? undefined}
          onChange={(event: any) => {
            if (event) {
              setDateRange((state) => {
                const date = {
                  ...state,
                  from: event,
                };
                changeHandler(date);
                return date;
              });
            }
          }}
          placeholder="Start Date"
        />

        <PersianDatePicker
          label="End Date"
          value={dateRange.to ?? undefined}
          onChange={(event: any) => {
            if (event) {
              setDateRange((state) => {
                const date = {
                  ...state,
                  to: event,
                };
                changeHandler(date);
                return date;
              });
            }
          }}
          placeholder="End Date"
        />
      </div>
    </div>
  );
}
