"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionMenu from "./ActionMenu";
import { MantineDataTable } from "./MantineDataTable";
import useSWR from "swr";
import { Center } from "@mantine/core";
import { useAxios } from "@/customHooks/useAxios";
import { TbClick } from "react-icons/tb";
import { Actions } from "./Actions";
import toast from "react-hot-toast";
import SecondTableTitle from "../SecondTableTitle";
import { useTranslation } from "@/app/i18n/client";

interface DataTableProps {
  title: string;
  url: string;
  deleteUrl: string;
  columns: Array<any>;
  lng: string;
  open?: () => void;
  mutated: boolean;
  setMutated: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<number | undefined>>;
  showView?: boolean;
  setView?: Dispatch<SetStateAction<number | undefined>>;
  showAdd: boolean;
  showDelete: boolean;
  showEdit: boolean;
  height?: number;
  orderBy?: {
    column: string;
    order: "desc" | "asc";
  };
  showSecondTitle?: boolean;
  secondTitleAddLabel?: string;
  onDelete?: () => {};
  showFilter?: boolean;
  openFilterCliked?: any;
  filterData?: any;
}

const CustomDataTable = ({
  title,
  url,
  deleteUrl,
  columns,
  lng,
  open,
  mutated,
  setMutated,
  setEdit,
  setView,
  showAdd,
  showDelete,
  showEdit,
  showView = true,
  height = undefined,
  orderBy = {
    column: "created_at",
    order: "desc",
  },
  showSecondTitle = false,
  secondTitleAddLabel,
  onDelete,
  showFilter,
  openFilterCliked,
  filterData,
  ...additionalProps
}: DataTableProps) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();
  const [search, setSearch] = useState("");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [tableDetails, setTableDetails] = useState({
    page: 1,
    per_page: 20,
    search: "",
    order_by: orderBy,
    filter_data: filterData ?? {},
  });

  const { data, error, isLoading, mutate } = useSWR(
    [url, tableDetails],
    async () => {
      const { response } = await callApi({
        method: "GET",
        url,
        params: tableDetails,
      });
      return response;
    }
  );

  useEffect(() => {
    (async function () {
      if (mutated) {
        await mutate();
        setMutated(false);
      }
    })();
  }, [mutated, mutate, setMutated]);

  useEffect(() => {
    setTableDetails((d: any) => {
      return { ...d, filter_data: JSON.stringify(filterData) };
    });
  }, [filterData]);

  const renderActions = (record: any) => (
    <Actions
      record={record}
      setEdit={setEdit}
      setView={setView}
      showEdit={showEdit}
      showView={showView}
    />
  );

  let actionIndex = columns.findIndex((col) => col.accessor == "actions");
  if (actionIndex == -1 && (showView || showEdit)) {
    columns.push({
      accessor: "actions",
      title: (
        <Center>
          <TbClick size={16} />
        </Center>
      ),
      width: "0%", // 👈 use minimal width
      render: renderActions,
    });
  }

  const handleDelete = async (e: any) => {
    setDeleteLoading(true);
    const ids = selectedRecords.map((rec: any) => rec.id);
    const { status, error } = await callApi({
      method: "DELETE",
      url: deleteUrl,
      data: { ids },
    });

    if (status == 204) {
      await mutate();
      if (onDelete) {
        await onDelete();
      }
      setSelectedRecords([]);
      toast.success(t("successfully_deleted"));
    } else if (status == 422) toast.error(t("delete_not_allowed"));
    if (error && status != 422) toast.error(t("something_went_wrong"));

    setDeleteLoading(false);
  };

  const secondTitle = (
    <SecondTableTitle
      title={title}
      showAdd={showAdd}
      showDelete={showDelete && selectedRecords.length > 0}
      addLabel={secondTitleAddLabel}
      deleteLabel={t("delete")}
      deleteLoading={deleteLoading}
      handleDelete={handleDelete}
      openModal={open}
    />
  );

  return (
    <>
      {!showSecondTitle && (
        <ActionMenu
          deleteUrl={deleteUrl}
          onSearch={setSearch}
          lng={lng}
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
          mutate={mutate}
          open={open}
          showAdd={showAdd}
          showDelete={showDelete}
          deleteLoading={deleteLoading}
          handleDelete={handleDelete}
          showFilter={showFilter}
          openFilterCliked={openFilterCliked}
        />
      )}
      <MantineDataTable
        title={showSecondTitle ? secondTitle : title}
        lng={lng}
        columns={columns}
        search={search}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
        tableDetails={tableDetails}
        setTableDetails={setTableDetails}
        data={data}
        isLoading={isLoading}
        showDelete={showDelete}
        height={height}
        orderBy={orderBy}
        {...additionalProps}
      />
    </>
  );
};

export { CustomDataTable };
