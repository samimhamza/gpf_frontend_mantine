"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
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
import TeamModal from "./TeamModal";
import CustomFilterModal from "@/components/CustomFilterModal";
import { TeamFilterContent } from "@/shared/filterContents/team.filter.content";

export const TeamModule = ({ lng }: { lng: string }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const router = useRouter();
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = TeamColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/teams/",
    setMutated
  );

  const filterContent = TeamFilterContent(t);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<number>();
  const [view, setView] = useState<number>();

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit, open]);

  useEffect(() => {
    if (view) {
      router.push(`/teams/${view}`);
    }
  }, [view, router]);

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
        openFilterCliked={() => setOpenFilter(true)}
        showFilter={true}
      />
      {opened && (
        <TeamModal
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
      {openFilter && (
        <CustomFilterModal
          open={openFilter}
          close={() => setOpenFilter((open) => !open)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title={t("teams_filter")}
          content={filterContent}
        />
      )}
    </>
  );
};
