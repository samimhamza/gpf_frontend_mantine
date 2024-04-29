"use client";

import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@/components/DataTable";
import { TeamMembersColumns } from "@/shared/columns/team_members.columns";

const TeamMemberInfo = ({
  lng,
  databaseID,
  team,
  mutate,
}: {
  lng: string;
  databaseID: number;
  team: any;
  mutate: any;
}) => {
  const { t } = useTranslation(lng);
  const columns = TeamMembersColumns(t);
  const [opened, { open, close }] = useDisclosure();
  const [mutated, setMutated] = useState(false);
  const [edit, setEdit] = useState<number>();

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit]);

  return (
    <>
      <CustomDataTable
        title={t("team_members")}
        url={`/team_member/${databaseID}`}
        deleteUrl="teams/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        height={300}
        showDelete={false}
        showEdit={false}
        showAdd={false}
      />
    </>
  );
};

export default TeamMemberInfo;
