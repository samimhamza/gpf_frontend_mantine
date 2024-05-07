import React, { useEffect, useState } from "react";
import { Checkbox, Button, Box, Group } from "@mantine/core";

interface FilterCheckboxProps {
  label: string;
  items: { label: string; value: string }[];
  values: string[];
  changeHandler: (checkedItems: string[]) => void;
}

export default function FilterCheckbox({
  label,
  items,
  values,
  changeHandler,
}: FilterCheckboxProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedItems((state) => {
        changeHandler([...state, event.target.name]);
        return [...state, event.target.name];
      });
    } else {
      setCheckedItems((state) => {
        const index = state.indexOf(event.target.name);
        if (index > -1) {
          state.splice(index, 1);
        }
        changeHandler([...state]);
        return [...state];
      });
    }
  };

  useEffect(() => {
    setCheckedItems(values);
  }, [values]);

  return (
    <Box>
      <Group
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        me={30}
      >
        <Box>{label}</Box>
        {items?.map((value: any, index) => (
          <Checkbox
            key={index + value}
            label={value.charAt(0).toUpperCase() + value.slice(1)}
            checked={checkedItems.includes(value)}
            onChange={(event) => onChange(event)}
            size="sm"
          />
        ))}
      </Group>
      <Button onClick={() => changeHandler([])} mt={10} size="xs">
        Clear
      </Button>
    </Box>
  );
}
