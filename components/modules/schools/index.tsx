"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { SchoolColumns } from "@/shared/columns/school.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import SchoolModal from "./SchoolModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CREATE_SCHOOLS,
  DELETE_SCHOOLS,
  UPDATE_SCHOOLS,
  CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const SchoolModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = SchoolColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/schools/",
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

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("schools") },
        ]}
      />
      <CustomDataTable
        title={t("schools")}
        url="/schools"
        deleteUrl="/schools/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_SCHOOLS)}
        showDelete={permissionChecker(DELETE_SCHOOLS)}
        showEdit={permissionChecker(UPDATE_SCHOOLS)}
      />
      {opened && (
        <SchoolModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_school") : t("update_school")}
          editId={edit}
        />
      )}
    </>
  );
};
