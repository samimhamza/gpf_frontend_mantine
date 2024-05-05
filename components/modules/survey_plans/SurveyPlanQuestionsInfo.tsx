"use client";

import { useTranslation } from "@/app/i18n/client";
import { TeamMembersColumns } from "@/shared/columns/team_members.columns";
import {
  Box,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdAdd, MdDelete } from "react-icons/md";
import SurveyPlanQuestionModal from "./SurveyPlanQuestionModal";
import { useState } from "react";

const SurveyPlanQuestionsInfo = ({
  lng,
  data,
  loading,
}: {
  lng: string;
  data: any;
  loading: boolean;
}) => {
  const { t } = useTranslation(lng);
  const columns = TeamMembersColumns(t);
  const [opened, { open, close }] = useDisclosure(false);
  const [mutated, setMutated] = useState(false);

  const rows = data?.members?.map((element: any) => (
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
        <Flex
          justify={{ base: "center", xs: "space-between" }}
          align="center"
          className="applicant-title"
          p="md"
          gap="sm"
          wrap="wrap"
        >
          <Title order={3} p="sm" className="applicant-title" ta="center">
            {t("survey_plan_questions_info")}
          </Title>
          <Group>
            <Button color="red" rightSection={<MdDelete size={14} />}>
              {t("delete")}
            </Button>
            <Button onClick={() => open()} rightSection={<MdAdd size={14} />}>
              {t("add")}
            </Button>
          </Group>
        </Flex>
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
      {opened && (
        <SurveyPlanQuestionModal
          opened={opened}
          close={() => {
            close();
          }}
          lng={lng}
          setMutated={mutated}
          title={t("add_question")}
          surveyId={data?.id}
        />
      )}
    </>
  );
};

export default SurveyPlanQuestionsInfo;
