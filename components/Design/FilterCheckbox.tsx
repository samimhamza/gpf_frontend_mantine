import React, { useEffect, useState } from "react";
import { Checkbox, Box, Card, Grid, TextInput, Text } from "@mantine/core";

interface FilterCheckboxProps {
  label: string;
  items: string[];
  values: string[];
  changeHandler: (updatedValues: any) => void;
  item: any;
}

export default function FilterCheckbox({
  label,
  items,
  values,
  changeHandler,
  item,
}: FilterCheckboxProps) {
  const [checkboxValues, setCheckboxValues] = useState<string[]>(values ?? []);
  const handleCheckboxChange = (checked: boolean, value: string) => {
    setCheckboxValues((items) =>
      checked
        ? items.includes(value)
          ? items
          : [...items, value]
        : items.filter((el) => el != value)
    );
  };

  useEffect(() => {
    changeHandler({ [item.name]: checkboxValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValues]);

  return (
    <Grid>
      <Grid.Col mb={20}>
        <Box mb={5}>{label}</Box>
        <Card withBorder shadow="xs" p="xs">
          {items && items.length > 0 && (
            <Grid>
              {items.map((item: any, index) => (
                <React.Fragment key={index}>
                  <Grid.Col span={6}>
                    <Checkbox
                      label={item}
                      checked={checkboxValues.includes(item)}
                      onChange={(event) => {
                        handleCheckboxChange(event.currentTarget.checked, item);
                      }}
                      size="sm"
                    />
                  </Grid.Col>
                </React.Fragment>
              ))}
            </Grid>
          )}
        </Card>
      </Grid.Col>
    </Grid>
  );
}
