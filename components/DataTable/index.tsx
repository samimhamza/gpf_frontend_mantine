"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Center } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbClick } from "react-icons/tb";
import useSWR from "swr";
import SecondTableTitle from "../SecondTableTitle";
import ActionMenu from "./ActionMenu";
import { Actions } from "./Actions";
import { MantineDataTable } from "./MantineDataTable";

interface DataTableProps {
  title: string;
  url: string;
  deleteUrl: string;
  columns: Array<any>;
  lng: string;
  open?: () => void;
  anotherOpen?: () => void;
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
  setPageNumber?: Dispatch<SetStateAction<number>>;
}

const CustomDataTable = ({
  title,
  url,
  deleteUrl,
  columns,
  lng,
  open,
  anotherOpen,
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
  setPageNumber,
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
  console.log(data);
  useEffect(() => {
    if (tableDetails.page && setPageNumber) {
      const { page } = tableDetails;
      setPageNumber(page);
    }
  }, [tableDetails, setPageNumber]);

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

  console.log();
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
          anotherOpen={anotherOpen}
          showAdd={showAdd}
          showDelete={showDelete}
          deleteLoading={deleteLoading}
          handleDelete={handleDelete}
          showExport={!!data?.data?.length} // TODO LATER
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
