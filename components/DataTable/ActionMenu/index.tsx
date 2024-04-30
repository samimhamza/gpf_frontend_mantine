"use client";

import { useTranslation } from "@/app/i18n/client";
import { ActionIcon, Button, Group, Input, Paper } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";

interface ActionMenuProps {
  deleteUrl: string;
  selectedRecords: Array<any>;
  setSelectedRecords: Dispatch<SetStateAction<any>>;
  onSearch: Dispatch<SetStateAction<string>>;
  lng: string;
  mutate: any;
  open?: () => void;
  showAdd: boolean;
  showDelete: boolean;
  deleteLoading: boolean;
  handleDelete: (e: any) => {};
}

const ActionMenu = ({
  selectedRecords,
  onSearch,
  lng,
  open,
  showAdd,
  showDelete,
  deleteLoading,
  handleDelete,
}: ActionMenuProps) => {
  const { t } = useTranslation(lng);
  const [search, setSearch] = useState("");

  const handleSearch = (e: any) => {
    if (e.keyCode == 13) {
      onSearch(search);
    }
  };

  return (
    <Paper p="md" withBorder shadow="sm" mb="md">
      <Group justify="space-between" align="center">
        <Group>
          <Input
            radius="xl"
            placeholder={t("search")}
            w="300px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <ActionIcon variant="filled" radius="xl" aria-label="Search">
            <IoSearch
              style={{ width: "70%", height: "70%" }}
              onClick={() => onSearch(search)}
            />
          </ActionIcon>
        </Group>
        <Group>
          {showDelete && selectedRecords.length > 0 && (
            <Button
              loading={deleteLoading}
              onClick={handleDelete}
              color="red"
              rightSection={<MdDelete size={14} />}
            >
              {t("delete")}
            </Button>
          )}
          {showAdd && (
            <Button onClick={open} rightSection={<MdAdd size={14} />}>
              {t("add")}
            </Button>
          )}
        </Group>
      </Group>
    </Paper>
  );
};

export default ActionMenu;
