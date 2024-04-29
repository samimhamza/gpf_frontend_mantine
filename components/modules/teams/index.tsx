"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import OfficeModal from "./TeamModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CHANGE_STATUS,
  CREATE_TEAMS,
  DELETE_TEAMS,
  UPDATE_TEAMS,
} from "@/shared/constants/Permissions";
import { TeamColumns } from "@/shared/columns/team.columns";
import { useRouter } from "next/navigation";

export const TeamModule = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = TeamColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/teams/",
    setMutated
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<number>();
  const [view, setView] = useState<number>();

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit]);

  useEffect(() => {
    if (view) {
      router.push(`/teams_info/${view}`);
    }
  }, [view]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("teams") },
        ]}
      />
      <CustomDataTable
        title={t("teams")}
        url="/teams"
        deleteUrl="/teams/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_TEAMS)}
        showDelete={permissionChecker(DELETE_TEAMS)}
        showEdit={permissionChecker(UPDATE_TEAMS)}
      />
      {opened && (
        <OfficeModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_team") : t("update_team")}
          editId={edit}
        />
      )}
    </>
  );
};
