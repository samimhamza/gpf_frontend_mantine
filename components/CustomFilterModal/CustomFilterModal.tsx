import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import FilterAutocomplete from "../Design/FilterAutocomplete";
import FilterCheckbox from "../Design/FilterCheckbox";
import FilterDateRange from "../Design/FilterDateRange";

// Import statements...

const CustomFilterModal = ({
  open = false,
  toggleOpen,
  title,
  content,
  initialData,
  updateFilterData,
}: {
  open?: boolean;
  toggleOpen: () => void;
  title: string;
  content: any;
  initialData: any;
  updateFilterData: any;
}) => {
  const [filterData, setFilterData] = useState(initialData);

  return (
    <Modal
      title={title}
      opened={open}
      onClose={toggleOpen}
      size={"70%"}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      <Card>
        <Divider m="xs" />
        <Box>
          <Grid>
            {content.map((section: any) => (
              <Grid.Col key={section.title} span={{ base: 12, md: 12, lg: 4 }}>
                <ScrollArea h={500} scrollbars="y">
                  <Card shadow="sm" padding="md" radius="md" withBorder>
                    <Text style={{ textAlign: "center", marginBottom: "15px" }}>
                      {section.title}
                    </Text>
                    {section.items.map((item: any, index: any) => (
                      <Box key={`${item.name}-${index}`}>
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
                      </Box>
                    ))}
                    {section.items.map((item: any, index: any) => (
                      <Box key={`${item.name}-${index}`}>
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
                      </Box>
                    ))}
                    {section.items.map((item: any, index: any) => (
                      <Box key={`${item.name}-${index}`}>
                        {item.type === "date_range" && (
                          <>
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
                            {section.items.length - 1 != index && (
                              <Divider my="md" />
                            )}
                          </>
                        )}
                      </Box>
                    ))}
                  </Card>
                </ScrollArea>
              </Grid.Col>
            ))}
          </Grid>
        </Box>

        <Divider m="xs" />
        <Group style={{ marginTop: 10 }}>
          <Button
            variant="outline"
            onClick={() => {
              updateFilterData(filterData);
              console.log(filterData);
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
