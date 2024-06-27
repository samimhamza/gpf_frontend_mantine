"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadExcel } from "@/components/exportFileComponents/excel/CharityPackages";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/CharityPackages";
import { CharityPackageColumns } from "@/shared/columns/charity_package.columns";
import {
  CREATE_CHARITY_PACKAGES,
  DELETE_CHARITY_PACKAGES,
  UPDATE_CHARITY_PACKAGES,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CharityPackageModal from "./CharityPackageModal";

export const CharityPackageModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = CharityPackageColumns(t);
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
          { title: t("charity_packages") },
        ]}
      />
      <CustomDataTable
        title={t("charity_packages")}
        url="/charity_packages"
        deleteUrl="/charity_packages/1"
        lng={lng}
        columns={columns}
        open={open}
        anotherOpen={anotherOpen}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_CHARITY_PACKAGES)}
        showDelete={permissionChecker(DELETE_CHARITY_PACKAGES)}
        showEdit={permissionChecker(UPDATE_CHARITY_PACKAGES)}
        showView={false}
        setPageNumber={setPageNumber}
      />
      {opened && (
        <CharityPackageModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_charity_package") : t("update_charity_package")}
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
          exportTitle={t("charity_packages")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/charity_packages"
          filterData={{}} // TODO LATER
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
    </>
  );
};
