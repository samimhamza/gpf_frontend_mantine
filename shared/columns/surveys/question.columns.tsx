import { Center } from "@mantine/core";
import { logColumns } from "..";

export const QuestionColumns = (t: (arg: string) => string) => {
  const logs = logColumns(t);

  return [
    {
      accessor: "id",
      title: t("id"),
      noWrap: true,
      sortable: true,
      render: ({ id }: { id: number }) => <Center>{id}</Center>,
    },
    {
      accessor: "code",
      title: t("code"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "question",
      title: t("question"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "type",
      title: t("type"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "parent_code",
      title: t("parent_question"),
      noWrap: true,
      sortable: true,
    },
    ...logs,
  ];
};
