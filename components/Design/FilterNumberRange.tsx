import React, { useEffect, useState } from "react";
import { Box, NumberInput } from "@mantine/core";

interface NumberRange {
  min?: string | number;
  max?: string | number;
}

interface FilterNumberRangeProps {
  changeHandler: (numberRange: NumberRange) => void;
  values: NumberRange;
  item: {
    label: string;
    min?: number;
    max?: number;
  };
}

const FilterNumberRange: React.FC<FilterNumberRangeProps> = ({
  changeHandler,
  values,
  item,
}: FilterNumberRangeProps) => {
  const [numberRange, setNumberRange] = useState<NumberRange>({});

  useEffect(() => {
    setNumberRange(values);
  }, [values]);

  return (
    <>
      <div>{item.label}</div>
      <Box style={{ display: "flex", columnGap: 3, margin: 2 }}>
        <NumberInput
          size="sm"
          label={item.label}
          value={numberRange.min ?? ""}
          onChange={(event: any) => {
            const min = event.target.value;
            setNumberRange((prevState) => {
              const number: NumberRange = {
                ...prevState,
                min: min,
              };
              changeHandler(number);
              return number;
            });
          }}
        />
        <NumberInput
          size="sm"
          label={item.label}
          value={numberRange.max ?? ""}
          onChange={(event: any) => {
            const min = event.target.value;
            setNumberRange((prevState) => {
              const number: NumberRange = {
                ...prevState,
                min: min,
              };
              changeHandler(number);
              return number;
            });
          }}
        />
      </Box>
    </>
  );
};

export default FilterNumberRange;
