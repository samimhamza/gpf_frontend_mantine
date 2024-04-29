import { Avatar, Center } from "@mantine/core";
import { logColumns } from ".";
import { getDateTime } from "../functions";

export const TeamMembersColumns = (t: (arg: string) => string) => {
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
      accessor: "profile",
      title: t("profile"),
      noWrap: true,
      sortable: true,
      render: ({ profile }: { profile: string }) => (
        <Center>
          <Avatar src={profile} alt="profile" size={35} />
        </Center>
      ),
    },
    {
      accessor: "first_name",
      title: t("first_name"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "last_name",
      title: t("last_name"),
      noWrap: true,
      sortable: true,
    },
    ...logs,
  ];
};
