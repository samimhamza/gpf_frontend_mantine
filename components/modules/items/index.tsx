"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { ItemColumns } from "@/shared/columns/item.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import ItemModal from "./ItemModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  UPDATE_ITEMS,
  CREATE_ITEMS,
  DELETE_ITEMS,
} from "@/shared/constants/Permissions";

export const ItemModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = ItemColumns(t);
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
          { title: t("items") },
        ]}
      />
      <CustomDataTable
        title={t("items")}
        url="/items"
        deleteUrl="/items/1"
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_ITEMS)}
        showDelete={permissionChecker(DELETE_ITEMS)}
        showEdit={permissionChecker(UPDATE_ITEMS)}
        showView={false}
      />
      {opened && (
        <ItemModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_item") : t("update_item")}
          editId={edit}
        />
      )}
    </>
  );
};
