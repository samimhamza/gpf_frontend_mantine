import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import FilterAutocomplete from "../Design/FilterAutocomplete";
import FilterCheckbox from "../Design/FilterCheckbox";
import FilterNumberRange from "../Design/FilterNumberRange";
import FilterDateRange from "../Design/FilterDateRange";
import { useMediaQuery } from "@mantine/hooks";

const CustomFilterModal = ({
  open = false,
  toggleOpen,
  title,
  content,
  initialData,
  updateFilterData,
  width,
}: {
  open?: boolean;
  toggleOpen: () => void;
  title: string;
  content: any;
  initialData: any;
  updateFilterData: any;
  width?: string;
}) => {
  const [filterData, setFilterData] = useState(initialData);
  const theme = useMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  return (
    <Modal
      opened={open}
      onClose={toggleOpen}
      size={mdMatches ? (width ? width : "65%") : smMatches ? "80%" : "100%"}
    >
      <Card shadow="md" padding="lg" radius="lg">
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Text style={{ lineHeight: 1 }} variant="h2">
            {title}
          </Text>
        </Box>
        <Divider m="xs" />
        <Box style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {content.map((section: any) => (
            <Group title={section.title} key={section.title}>
              {section.items.map((item: any, index: any) => (
                <div style={{ marginBottom: 20 }} key={`${item.name}-${index}`}>
                  {item.type === "autocomplete" && (
                    <FilterAutocomplete
                      url={item.url}
                      label={item.label}
                      name={item.name}
                      keyName={item.keyName ?? item.name}
                      values={filterData[item.name] ?? []}
                      onChange={(event: any) => {
                        setFilterData((state: any) => ({
                          ...state,
                          [item.name]: event,
                        }));
                      }}
                    />
                  )}
                  {item.type === "checkbox" && (
                    <FilterCheckbox
                      label={item.label}
                      items={item.items}
                      values={filterData[item.name] ?? []}
                      changeHandler={(checkedItems: any) => {
                        setFilterData((state: any) => ({
                          ...state,
                          [item.name]: checkedItems,
                        }));
                      }}
                    />
                  )}
                  {item.type === "textfield" && (
                    <TextInput
                      label={item.label}
                      value={filterData[item.name] ?? ""}
                      onChange={(event: any) => {
                        setFilterData((state: any) => ({
                          ...state,
                          [item.name]: event.target.value,
                        }));
                      }}
                      style={{ marginBottom: 20 }}
                    />
                  )}
                  {item.type === "number_range" && (
                    <FilterNumberRange
                      item={item}
                      values={filterData[item.name] ?? []}
                      changeHandler={(numberRange: any) => {
                        setFilterData((state: any) => ({
                          ...state,
                          [item.name]: numberRange,
                        }));
                      }}
                    />
                  )}
                  {item.type === "date_range" && (
                    <FilterDateRange
                      label={item.label}
                      values={filterData[item.name] ?? []}
                      changeHandler={(dateRange: any) => {
                        setFilterData((state: any) => ({
                          ...state,
                          [item.name]: dateRange,
                        }));
                      }}
                    />
                  )}
                </div>
              ))}
            </Group>
          ))}
        </Box>

        <Divider m="xs" />

        <Group style={{ marginTop: 10 }}>
          <Button
            variant="outline"
            onClick={() => {
              updateFilterData(filterData);
              toggleOpen();
            }}
          >
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setFilterData({});
              updateFilterData({});
            }}
          >
            Reset
          </Button>
          <Button variant="outline" onClick={toggleOpen}>
            Cancel
          </Button>
        </Group>
      </Card>
    </Modal>
  );
};

export default CustomFilterModal;
