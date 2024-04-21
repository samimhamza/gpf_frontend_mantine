"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { RoleColumns } from "@/shared/columns/role.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import RoleModal from "./RoleModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  UPDATE_ROLES,
  CREATE_ROLES,
  DELETE_ROLES,
} from "@/shared/constants/Permissions";

export const RoleModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = RoleColumns(t);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<number>();

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
          { title: t("roles") },
        ]}
      />
      <CustomDataTable
        title={t("roles")}
        url="/roles"
        deleteUrl="/roles/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        showAdd={permissionChecker(CREATE_ROLES)}
        showDelete={permissionChecker(DELETE_ROLES)}
        showEdit={permissionChecker(UPDATE_ROLES)}
        showView={false}
      />
      {opened && (
        <RoleModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_role") : t("update_role")}
          editId={edit}
        />
      )}
    </>
  );
};
