"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadExcel } from "@/components/exportFileComponents/excel/Warehouses";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/Warehouses";
import { WarehouseColumns } from "@/shared/columns/warehouse.columns";
import {
  CREATE_WAREHOUSES,
  DELETE_WAREHOUSES,
  UPDATE_WAREHOUSES,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WarehouseModal from "./WarehouseModal";

export const WarehouseModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const [mutated, setMutated] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  // Second useDisclosure state for ExportModal
  const [anotherOpened, { open: anotherOpen, close: anotherClose }] =
    useDisclosure(false);
  // Get Page Number details for Export Modal params
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [edit, setEdit] = useState<number>();
  const [view, setView] = useState<number>();
  const columns = WarehouseColumns(t);

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit, open]);

  useEffect(() => {
    if (view) {
      router.push(`/warehouses/${view}`);
    }
  }, [view, router]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("warehouses") },
        ]}
      />
      <CustomDataTable
        title={t("warehouses")}
        url="/warehouses"
        deleteUrl="/warehouses/1"
        lng={lng}
        columns={columns}
        open={open}
        anotherOpen={anotherOpen}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_WAREHOUSES)}
        showDelete={permissionChecker(DELETE_WAREHOUSES)}
        showEdit={permissionChecker(UPDATE_WAREHOUSES)}
        setPageNumber={setPageNumber}
      />
      {opened && (
        <WarehouseModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_warehouse") : t("update_warehouse")}
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
          exportTitle={t("warehouses")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/warehouses"
          filterData={{}} // TODO LATE
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
    </>
  );
};
