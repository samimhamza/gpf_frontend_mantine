import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CloseButton,
  Divider,
  Grid,
  Group,
  Modal,
  NumberInput,
  ScrollArea,
  Text,
  TextInput,
  Title,
  useSafeMantineTheme,
} from "@mantine/core";
import FilterAutocomplete from "../Design/FilterAutocomplete";
import FilterCheckbox from "../Design/FilterCheckbox";
import FilterDateRange from "../Design/FilterDateRange";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const CustomFilterModal = ({
  open = false,
  close,
  title,
  content,
  initialData,
  updateFilterData,
  lng,
}: {
  open?: boolean;
  close: () => void;
  title: string;
  content: any;
  initialData: any;
  updateFilterData: any;
  lng: string;
}) => {
  const { t } = useTranslation(lng);
  const [filterData, setFilterData] = useState(initialData);
  const theme = useSafeMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Modal
        opened={open}
        onClose={close}
        centered
        size={mdMatches ? "70%" : smMatches ? "80%" : "100%"}
        className="custom-modal"
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "pop" }}
        lockScroll={true}
        closeOnClickOutside={false}
      >
        <Group justify="space-between" className="modal-header" p="xs">
          <Title order={4}>{title}</Title>
          <CloseButton
            className="close-btn"
            aria-label="Close modal"
            onClick={close}
          />
        </Group>
        <Box p="sm">
          <Grid>
            {content.map((section: any) => (
              <Grid.Col key={section.title} span={{ base: 12, md: 12, lg: 4 }}>
                <ScrollArea h={{ lg: 450 }} scrollbars="y">
                  <Card shadow="sm" padding="md" radius="md" withBorder>
                    <Title mb={20} order={5} ta="center">
                      {section.title}
                    </Title>
                    {section.items.map((item: any, index: any) => (
                      <Box key={`${item.name}-${index}`}>
                        {item.type === "autocomplete" && (
                          <FilterAutocomplete
                            lng={lng}
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
                        {item.type === "data" &&
                          item.subType === "textInput" && (
                            <TextInput
                              mb={10}
                              label={item.label}
                              placeholder={item.label}
                              value={filterData[item.name] ?? ""}
                              name={item.name ?? ""}
                              onChange={(event) => {
                                setFilterData((state: any) => ({
                                  ...state,
                                  [item.name]: event.target.value ?? "",
                                }));
                              }}
                            />
                          )}
                        {item.type === "data" &&
                          item.subType === "checkbox" && (
                            <FilterCheckbox
                              lng={lng}
                              item={item}
                              label={item.label}
                              items={item.items}
                              values={filterData[item.name] ?? []}
                              changeHandler={(event: any) => {
                                setFilterData((state: any) => ({
                                  ...state,
                                  ...event,
                                }));
                              }}
                            />
                          )}
                        {item.type === "data" &&
                          item.subType === "numberRange" && (
                            <>
                              <Text>{item.label}</Text>
                              <Box
                                style={{
                                  display: "flex",
                                  columnGap: "10px",
                                }}
                              >
                                <NumberInput
                                  mb={10}
                                  placeholder={t("min")}
                                  value={filterData[item.name]?.min ?? ""}
                                  name={`${item.name}_min`}
                                  onChange={(event) => {
                                    setFilterData((state: any) => ({
                                      ...state,
                                      [item.name]: {
                                        ...state[item.name],
                                        min: event,
                                      },
                                    }));
                                  }}
                                />

                                <NumberInput
                                  mb={10}
                                  placeholder={t("max")}
                                  value={filterData[item.name]?.max ?? ""}
                                  name={`${item.name}_max`}
                                  onChange={(event) => {
                                    setFilterData((state: any) => ({
                                      ...state,
                                      [item.name]: {
                                        ...state[item.name], // Preserve the existing state for other properties
                                        max: event, // Update the max value
                                      },
                                    }));
                                  }}
                                />
                              </Box>
                            </>
                          )}
                      </Box>
                    ))}
                    {section.items.map((item: any, index: any) => (
                      <Box key={`${item.name}-${index}`}>
                        {item.type === "date_range" && (
                          <>
                            <FilterDateRange
                              lng={lng}
                              label={item.label}
                              values={filterData[item.name] ?? []}
                              changeHandler={(event: any) => {
                                setFilterData((state: any) => ({
                                  ...state,
                                  [item.name]: event,
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
        <Group p="sm" className="modal-footer" justify="flex-end">
          <Button variant="outline" onClick={close}>
            Cancel
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
          <Button
            onClick={() => {
              updateFilterData(filterData);
              close();
            }}
          >
            Apply
          </Button>
        </Group>
      </Modal>
      <style jsx global>{`
        .custom-modal .mantine-Modal-body {
          padding: 0;
        }
        .custom-modal .modal-header {
          border-bottom: 1px solid var(--mantine-color-gray-4);
        }
        .custom-modal .modal-footer {
          border-top: 1px solid var(--mantine-color-gray-4);
        }
        .custom-modal .mantine-Modal-inner {
          left: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};

export default CustomFilterModal;
