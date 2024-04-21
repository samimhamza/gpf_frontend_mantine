"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { EmployeeColumns } from "@/shared/columns/employee.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import EmployeeModal from "./EmployeeModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  UPDATE_EMPLOYEES,
  CREATE_EMPLOYEES,
  DELETE_EMPLOYEES,
  CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const EmployeeModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = EmployeeColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/employees/",
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

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("employees") },
        ]}
      />
      <CustomDataTable
        title={t("employees")}
        url="/employees"
        deleteUrl="/employees/1"
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
        <EmployeeModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_employee") : t("update_employee")}
          editId={edit}
        />
      )}
    </>
  );
};
