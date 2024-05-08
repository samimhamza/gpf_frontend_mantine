import React, { useEffect, useState } from "react";
import { Checkbox, Box, Card, Grid, TextInput, Text } from "@mantine/core";

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
  const [filterData, setFilterData] = useState([]);
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
    <Grid>
      <Grid.Col mb={20}>
        <Box mb={5}>{label}</Box>
        <Card withBorder shadow="xs" p="xs">
          {items && items.length > 0 && (
            <Grid>
              {items.map((value: any, index) => (
                <>
                  <Grid.Col span={6}>
                    <Checkbox
                      key={index + value}
                      label={value.charAt(0).toUpperCase() + value.slice(1)}
                      checked={checkedItems.includes(value)}
                      onChange={(event) => onChange(event)}
                      size="sm"
                    />
                  </Grid.Col>
                </>
              ))}
            </Grid>
          )}
        </Card>
      </Grid.Col>
    </Grid>
  );
}
