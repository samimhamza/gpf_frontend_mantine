"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { MosqueColumns } from "@/shared/columns/mosque.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import MosqueModal from "./MosqueModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CREATE_MOSQUES,
  DELETE_MOSQUES,
  UPDATE_MOSQUES,
  CHANGE_STATUS,
} from "@/shared/constants/Permissions";

export const MosqueModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = MosqueColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/mosques/",
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
          { title: t("mosques") },
        ]}
      />
      <CustomDataTable
        title={t("mosques")}
        url="/mosques"
        deleteUrl="/mosques/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_MOSQUES)}
        showDelete={permissionChecker(DELETE_MOSQUES)}
        showEdit={permissionChecker(UPDATE_MOSQUES)}
      />
      {opened && (
        <MosqueModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_mosque") : t("update_mosque")}
          editId={edit}
        />
      )}
    </>
  );
};
