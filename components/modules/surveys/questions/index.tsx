"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { QuestionColumns } from "@/shared/columns/surveys/question.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import QuestionModal from "./QuestionModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  UPDATE_EMPLOYEES,
  CREATE_EMPLOYEES,
  DELETE_EMPLOYEES,
} from "@/shared/constants/Permissions";

export const QuestionModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = QuestionColumns(t);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<number>();
  const [view, setView] = useState<number>();

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit, open]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("questions") },
        ]}
      />
      <CustomDataTable
        title={t("questions")}
        url="/questions"
        deleteUrl="/questions/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_EMPLOYEES)}
        showDelete={permissionChecker(DELETE_EMPLOYEES)}
        showEdit={permissionChecker(UPDATE_EMPLOYEES)}
        showView={false}
      />
      {opened && (
        <QuestionModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_question") : t("update_question")}
          editId={edit}
        />
      )}
    </>
  );
};
