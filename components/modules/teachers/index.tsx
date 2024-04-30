"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { TeacherColumns } from "@/shared/columns/teacher.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import TeacherModal from "./TeacherModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  UPDATE_APPLICANTS,
  CREATE_APPLICANTS,
  DELETE_APPLICANTS,
  CHANGE_STATUS,
} from "@/shared/constants/Permissions";
import { useRouter } from "next/navigation";

export const TeacherModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const [mutated, setMutated] = useState(false);
  const columns = TeacherColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/applicants/",
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
      router.push(`/applicants/${view}`);
    }
  }, [view]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("teachers") },
        ]}
      />
      <CustomDataTable
        title={t("teachers")}
        url="/teachers"
        deleteUrl="/teachers/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_APPLICANTS)}
        showDelete={permissionChecker(DELETE_APPLICANTS)}
        showEdit={permissionChecker(UPDATE_APPLICANTS)}
      />
      {opened && (
        <TeacherModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_teacher") : t("update_teacher")}
          editId={edit}
        />
      )}
    </>
  );
};
