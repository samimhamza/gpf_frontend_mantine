"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import CustomFilterModal from "@/components/CustomFilterModal";
import { CustomDataTable } from "@/components/DataTable";
import ExportModal from "@/components/exportFileComponents/ExportModal";
import { handleDownloadExcel } from "@/components/exportFileComponents/excel/UserExportExcel";
import { handleDownloadPDF } from "@/components/exportFileComponents/pdf/UsersExportPDF";
import { UserColumns } from "@/shared/columns/user.columns";
import {
  CHANGE_STATUS,
  CREATE_USERS,
  DELETE_USERS,
  UPDATE_USERS,
} from "@/shared/constants/Permissions";
import { UserFilterContent } from "@/shared/filterContents/user.filter.content";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserModal from "./UserModal";

export const UserModule = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const columns = UserColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    "/users/",
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
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const filterContent = UserFilterContent(t);

  useEffect(() => {
    if (edit) {
      open();
    }
  }, [edit, open]);

  useEffect(() => {
    if (view) {
      router.push(`/users/${view}`);
    }
  }, [view, router]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("users") },
        ]}
      />
      <CustomDataTable
        title={t("users")}
        url="/users"
        deleteUrl="/users/1"
        lng={lng}
        columns={columns}
        open={open}
        anotherOpen={anotherOpen}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_USERS)}
        showDelete={permissionChecker(DELETE_USERS)}
        showEdit={permissionChecker(UPDATE_USERS)}
        showFilter={true}
        openFilterCliked={() => setOpenFilter(true)}
        filterData={filterData}
        setPageNumber={setPageNumber}
      />
      {opened && (
        <UserModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t("add_user") : t("update_user")}
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
          exportTitle={t("users")}
          setMutated={setMutated}
          pageNumber={pageNumber}
          url="/users"
          filterData={filterData}
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadExcel={handleDownloadExcel}
        />
      )}
      {openFilter && (
        <CustomFilterModal
          open={openFilter}
          close={() => setOpenFilter((open) => !open)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title={t("users_filter")}
          content={filterContent}
          lng={lng}
        />
      )}
    </>
  );
};
