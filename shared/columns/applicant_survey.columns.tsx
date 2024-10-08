import { Badge, Center } from "@mantine/core";
import { logColumns } from ".";
import { getDate, getTimeValue } from "../functions";
import { boolean } from "zod";

export const ApplicantSurveyColumns = (t: (arg: string) => string) => {
  const logs = logColumns(t);

  const isActive = (end_date: any): boolean => {
    let now = new Date();
    let endDate = getTimeValue(end_date);
    const endDateNumber = endDate ? Number(endDate) : 0;
    if (endDateNumber > now.getTime()) {
      return true;
    }
    return false;
  };

  return [
    {
      accessor: "id",
      title: t("id"),
      noWrap: true,
      sortable: true,
      render: ({ id }: { id: number }) => <Center>{id}</Center>,
    },
    {
      accessor: "survey_date",
      title: t("survey_date"),
      noWrap: true,
      sortable: true,
      render: ({ survey_date }: { survey_date: string }) =>
        survey_date ? getDate(survey_date) : "",
    },
    {
      accessor: "status",
      title: t("status"),
      noWrap: true,
      sortable: true,
      render: (record: any) => {
        return isActive(record.charity_package.end_date) &&
          record.charity_package.period > record.implements_count ? (
          <Badge bg="green">{t("active")}</Badge>
        ) : (
          <Badge bg="red">{t("expired")}</Badge>
        );
      },
    },
    {
      accessor: "category_name",
      title: t("category"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "charity_package.name",
      title: t("charity_package"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "charity_package.period",
      title: t("period"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "implements_count",
      title: t("implements_count"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "charity_package.items_count",
      title: t("total_items"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "charity_package.start_date",
      title: t("start_date"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.charity_package.start_date
          ? getDate(record.charity_package.start_date)
          : "",
    },
    {
      accessor: "charity_package.end_date",
      title: t("end_date"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.charity_package.end_date
          ? getDate(record.charity_package.end_date)
          : "",
    },
    {
      accessor: "charity_package.cash_amount",
      title: t("cash_amount"),
      noWrap: true,
      sortable: true,
      render: (record: any) =>
        record.charity_package.cash_amount
          ? record.charity_package.cash_amount +
            " " +
            (record.charity_package.currency == "USD"
              ? t("usd")
              : record.charity_package.currency == "AFN"
              ? t("afn")
              : "")
          : "0",
    },
    {
      accessor: "description",
      title: t("description"),
      noWrap: true,
      sortable: true,
    },
    ...logs,
  ];
};
