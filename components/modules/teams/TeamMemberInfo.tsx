"use client";

import { useTranslation } from "@/app/i18n/client";
import { TeamMembersColumns } from "@/shared/columns/team_members.columns";
import { Box, Flex, LoadingOverlay, Paper, Table, Title } from "@mantine/core";

const TeamMemberInfo = ({
  lng,
  team,
  loading,
}: {
  lng: string;
  team: any;
  loading: boolean;
}) => {
  const { t } = useTranslation(lng);
  const columns = TeamMembersColumns(t);

  const rows = team?.members?.map((element: any) => (
    <Table.Tr key={element?.id}>
      {columns.map((column) => (
        <Table.Td key={column.accessor}>
          {column.render ? column.render(element) : element[column.accessor]}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
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
        <Title order={3} p="sm" className="applicant-title" ta="center">
          {t("team_members_info")}
        </Title>
        <Box pos="relative">
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
