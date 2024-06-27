"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadExcel } from "@/components/exportFileComponents/excel/Categories";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/Categories";
import { CategoryColumns } from "@/shared/columns/category.columns";
import {
  CHANGE_STATUS,
  CREATE_ITEMS,
  DELETE_ITEMS,
  UPDATE_ITEMS,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";

export const CategoryModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = CategoryColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/categories/",
    setMutated
  );
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
          { title: t("categories") },
        ]}
      />
      <CustomDataTable
        title={t("categories")}
        url="/categories"
        deleteUrl="/categories/1"
        lng={lng}
        columns={columns}
        open={open}
        anotherOpen={anotherOpen}
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
        <CategoryModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_category") : t("update_category")}
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
          exportTitle={t("categories")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/categories"
          filterData={{}} // TODO LATER
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
    </>
  );
};
