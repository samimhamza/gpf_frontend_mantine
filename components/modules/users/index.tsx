"use client";

import { CustomDataTable } from "@/components/DataTable";
import { useTranslation } from "@/app/i18n/client";
import { UserColumns } from "@/shared/columns/user.columns";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useDisclosure } from "@mantine/hooks";
import UserModal from "./UserModal";
import { useEffect, useState } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
  CREATE_USERS,
  DELETE_USERS,
  UPDATE_USERS,
  CHANGE_STATUS,
} from "@/shared/constants/Permissions";
import { useRouter } from "next/navigation";
import CustomFilterModal from "@/components/CustomFilterModal";
import { UserFilterContent } from "@/shared/filterContents/user.filter.content";

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
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_USERS)}
        showDelete={permissionChecker(DELETE_USERS)}
        showEdit={permissionChecker(UPDATE_USERS)}
        showFilter={true}
        openFilterCliked={() => setOpenFilter(true)}
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
      {openFilter && (
        <CustomFilterModal
          open={openFilter}
          close={() => setOpenFilter((open) => !open)}
          initialData={filterData}
          updateFilterData={setFilterData}
          title={t("teams_filter")}
          content={filterContent}
        />
      )}
    </>
  );
};
