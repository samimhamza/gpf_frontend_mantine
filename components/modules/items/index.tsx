"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/ItemsExportPDF";
import { ItemColumns } from "@/shared/columns/item.columns";
import {
  CREATE_ITEMS,
  DELETE_ITEMS,
  UPDATE_ITEMS,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";

export const ItemModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = ItemColumns(t);
  const [opened, { open, close }] = useDisclosure(false);
  // Second useDisclosure state for ExportModal
  const [anotherOpened, { open: anotherOpen, close: anotherClose }] =
    useDisclosure(false);
  // Get Page Number details for Export Modal params
  const [pageNumber, setPageNumber] = useState<number>(1);

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
        anotherOpen={anotherOpen}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_ITEMS)}
        showDelete={permissionChecker(DELETE_ITEMS)}
        showEdit={permissionChecker(UPDATE_ITEMS)}
        showView={false}
        setPageNumber={setPageNumber}
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
      {anotherOpened && (
        <ExportModal
          anotherOpened={anotherOpened}
          anotherClose={() => {
            anotherClose();
            setEdit(undefined);
          }}
          lng={lng}
          title={t("export")}
          exportTitle={t("items")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/items"
          filterData={{}} // TODO LATER
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={null}
        />
      )}
    </>
  );
};
