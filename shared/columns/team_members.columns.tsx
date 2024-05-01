import { Avatar, Center } from "@mantine/core";

export const TeamMembersColumns = (t: (arg: string) => string) => {
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
          <Avatar src={profile} alt="profile" size={45} />
        </Center>
      ),
    },
    {
      accessor: "first_name",
      title: t("first_name"),
      noWrap: true,
      sortable: true,
      render: ({ first_name }: { first_name: string }) => (
        <Center>{first_name}</Center>
      ),
    },
    {
      accessor: "last_name",
      title: t("last_name"),
      noWrap: true,
      sortable: true,
      render: ({ last_name }: { last_name: string }) => (
        <Center>{last_name}</Center>
      ),
    },
  ];
};
