"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CHANGE_STATUS,
  CREATE_SURVEY_PLANS,
  DELETE_SURVEY_PLANS,
  UPDATE_SURVEY_PLANS,
} from "@/shared/constants/Permissions";
import { useRouter } from "next/navigation";
import { SurveyPlansColumns } from "@/shared/columns/survey_plans.columns copy";
import SurveyPlansModal from "./SurveyPlansModal";

export const SurveyPlansModule = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = SurveyPlansColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/survey_plans/",
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
      router.push(`/survey_plans/${view}`);
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
        url="/survey_plans"
        deleteUrl="/survey_plans/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_SURVEY_PLANS)}
        showDelete={permissionChecker(DELETE_SURVEY_PLANS)}
        showEdit={permissionChecker(UPDATE_SURVEY_PLANS)}
      />
      {opened && (
        <SurveyPlansModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_survey_plan") : t("update_survey_plan")}
          editId={edit}
        />
      )}
    </>
  );
};
