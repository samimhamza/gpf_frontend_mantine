"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadExcel } from "@/components/exportFileComponents/excel/UserExportExcel";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/MosquesExportPDF";
import { MosqueColumns } from "@/shared/columns/mosque.columns";
import {
  CHANGE_STATUS,
  CREATE_MOSQUES,
  DELETE_MOSQUES,
  UPDATE_MOSQUES,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MosqueModal from "./MosqueModal";

export const MosqueModule = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = MosqueColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/mosques/",
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

  useEffect(() => {
    if (view) {
      router.push(`/covered_areas/mosques/${view}`);
    }
  }, [view, router]);

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
        anotherOpen={anotherOpen}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_MOSQUES)}
        showDelete={permissionChecker(DELETE_MOSQUES)}
        showEdit={permissionChecker(UPDATE_MOSQUES)}
        setPageNumber={setPageNumber}
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
      {anotherOpened && (
        <ExportModal
          anotherOpened={anotherOpened}
          anotherClose={() => {
            anotherClose();
            setEdit(undefined);
          }}
          lng={lng}
          title={t("export")}
          exportTitle={t("mosques")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/mosques"
          filterData={{}} // TODO LATER
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
    </>
  );
};
