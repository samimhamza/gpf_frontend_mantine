"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CHANGE_STATUS,
  CREATE_APPLICANT_SURVEYS,
  CREATE_TEAMS,
  DELETE_APPLICANT_SURVEYS,
  DELETE_TEAMS,
  UPDATE_APPLICANT_SURVEYS,
  UPDATE_TEAMS,
} from "@/shared/constants/Permissions";
import { TeamColumns } from "@/shared/columns/team.columns";
import { useRouter } from "next/navigation";
import TeamModal from "./TeamModal";

export const SurveyPlansModule = ({ lng }: { lng: string }) => {
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
  }, [edit, open]);

  useEffect(() => {
    if (view) {
      router.push(`/teams/${view}`);
    }
  }, [view]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("survey_plans") },
        ]}
      />
      <CustomDataTable
        title={t("survey_plans")}
        url="/applicant_surveys"
        deleteUrl="/applicant_surveys/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_APPLICANT_SURVEYS)}
        showDelete={permissionChecker(DELETE_APPLICANT_SURVEYS)}
        showEdit={permissionChecker(UPDATE_APPLICANT_SURVEYS)}
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
    </>
  );
};
