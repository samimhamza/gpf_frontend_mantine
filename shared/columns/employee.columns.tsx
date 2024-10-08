import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";
import { Avatar, Center } from "@mantine/core";
import { getDate } from "../functions";

export const EmployeeColumns = (
  t: (arg: string) => string,
  showStatus: boolean,
  statusUrl: string,
  setMutated: Dispatch<SetStateAction<boolean>>
) => {
  const logs = logColumns(t);

  const statuses = [
    {
      status: "active",
      color: "green",
      text: t("active"),
    },
    {
      status: "in_leave",
      color: "gray",
      text: t("in_leave"),
    },
    {
      status: "pending",
      color: "yellow",
      text: t("pending"),
    },
    {
      status: "resigned",
      color: "yellow",
      text: t("resigned"),
    },
  ];

  return [
    {
      accessor: "id",
      title: t("id"),
      noWrap: true,
      sortable: true,
      render: ({ id }: { id: number }) => <Center>{id}</Center>,
    },
    {
      accessor: "office_code",
      title: t("office"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "profile",
      title: t("profile"),
      noWrap: true,
      sortable: true,
      render: ({ profile }: { profile: string }) => (
        <Center>
          <Avatar src={profile} alt="profile" size={35} />
        </Center>
      ),
    },
    {
      accessor: "first_name",
      title: t("first_name"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "last_name",
      title: t("last_name"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "father_name",
      title: t("father_name"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "email",
      title: t("email"),
      sortable: true,
    },
    {
      accessor: "phone",
      title: t("phone"),
      sortable: true,
    },
    statusColum(t, statuses, statusUrl, showStatus, setMutated),
    {
      accessor: "gender",
      title: t("gender"),
      noWrap: true,
      sortable: true,
      render: ({ gender }: { gender: string }) =>
        gender == "male" ? t("male") : gender == "female" ? t("female") : "",
    },
    {
      accessor: "contracts.0.job_title",
      title: t("job_title"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "contracts.0.salary",
      title: t("salary"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.contracts[0]?.salary
          ? record.contracts[0]?.salary +
            " " +
            (record.contracts[0]?.currency == "USD"
              ? t("usd")
              : record.contracts[0]?.currency == "AFN"
              ? t("afn")
              : "")
          : "0",
    },
    {
      accessor: "start_date",
      title: t("start_date"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.contracts[0]?.start_date
          ? getDate(record.contracts[0]?.start_date)
          : "",
    },
    {
      accessor: "end_date",
      title: t("end_date"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.contracts[0]?.end_date
          ? getDate(record.contracts[0]?.end_date)
          : "",
    },
    ...logs,
  ];
};
