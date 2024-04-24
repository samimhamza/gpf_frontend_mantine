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
      render: ({ type }: { type: string }) =>
        type == "descriptive"
          ? t("descriptive")
          : type == "multiple_choice"
          ? t("multiple_choice")
          : "",
    },
    {
      accessor: "mark",
      title: t("mark"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "choices",
      title: t("total_choices"),
      noWrap: true,
      sortable: true,
      render: ({
        choices,
      }: {
        choices: Array<{ key: string; value: string }>;
      }) => <Center>{choices.length}</Center>,
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
