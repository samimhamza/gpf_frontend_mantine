"use client";

import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { TeamMembersColumns } from "@/shared/columns/team_members.columns";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  LoadingOverlay,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useAxios } from "@/customHooks/useAxios";
import toast from "react-hot-toast";
import { MdAdd, MdDelete } from "react-icons/md";

const TeamMemberInfo = ({
  lng,
  team,
  loading,
  mutate,
}: {
  mutate: any;
  lng: string;
  team: any;
  loading: boolean;
}) => {
  const { t } = useTranslation(lng);
  const columns = TeamMembersColumns(t);
  const [opened, { open, close }] = useDisclosure();
  const [edit, setEdit] = useState<number>();
  const [selectedRecord, setSelectedRecord] = useState<number[]>([]);
  const callApi = useAxios();

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit]);

  const handleDelete = async (e: any) => {
    console.log(selectedRecord);
    // setDeleteLoading(true);
    const ids = selectedRecord.map((rec: any) => rec.id).join(","); // Assuming selectedRecord contains objects with an 'id' property
    const teamId = team.id;
    const { status, error } = await callApi({
      method: "DELETE",
      url: `/teams/members/${ids}`,
      data: { teamId: teamId },
    });
    if (status == 204) {
      await mutate();
      setSelectedRecord([]);
      toast.success(t("successfully_deleted"));
    } else if (status == 422) toast.error(t("delete_not_allowed"));
    if (error && status != 422) toast.error(t("something_went_wrong"));

    // setDeleteLoading(false);
  };

  const rows = team?.members?.map((element: any) => (
    <Table.Tr key={element?.id}>
      <Table.Td>
        <Checkbox
          checked={selectedRecord.includes(element.id)}
          onChange={(event) =>
            setSelectedRecord(
              event.currentTarget.checked
                ? [...selectedRecord, element.id]
                : selectedRecord.filter((position) => position !== element.id)
            )
          }
        ></Checkbox>
      </Table.Td>
      {columns.map((column) => (
        <Table.Td key={column.accessor}>
          {column.render ? column.render(element) : element[column.accessor]}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th style={{ textAlign: "center", width: "15px" }}>
        <Checkbox
          checked={selectedRecord.length === team?.members?.length}
          onChange={(event) =>
            setSelectedRecord(
              event.currentTarget.checked
                ? team?.members?.map((element: any) => element.id)
                : []
            )
          }
        />
      </Table.Th>
      {columns.map((column) => (
        <Table.Th style={{ textAlign: "center" }} key={column.accessor}>
          {column.title}
        </Table.Th>
      ))}
    </Table.Tr>
  );

  return (
    <>
      <Paper withBorder shadow="sm" mb="md" pb="lg">
        <Flex
          justify={{ base: "center", xs: "space-between" }}
          align="center"
          className="applicant-title"
          p="md"
          gap="sm"
          wrap="wrap"
        >
          <Title order={3}>{t("team_members_info")}</Title>
          <Box>
            {selectedRecord.length > 0 && (
              <Button
                onClick={handleDelete}
                color="red"
                rightSection={<MdDelete size={14} />}
                me={10}
              >
                {t("delete")}
              </Button>
            )}
            <Button onClick={open} rightSection={<MdAdd size={14} />}>
              {t("add")}
            </Button>
          </Box>
        </Flex>
        <Box pos="relative" p="md">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Table horizontalSpacing="xs" striped highlightOnHover>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
      </Paper>
    </>
  );
};

export default TeamMemberInfo;
