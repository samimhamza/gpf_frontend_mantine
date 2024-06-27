import { t } from "i18next";
import * as XLSX from "xlsx";
import { formatTimestamp } from "../FormatDataFunction";

interface CharityPackageData {
  id: number;
  office_code: string;
  category_name: string;
  name: string;
  period: number;
  items_count: number;
  start_date: string;
  end_date: string;
  cash_amount: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  currency: string;
  office_id: number;
}

// Function to translate headers
const translateHeaders = (headers: string[]) => {
  return headers.map((header) => t(header));
};

// Function to download Excel table
export const handleDownloadExcel = (
  data: CharityPackageData[],
  exportTitle: string
) => {
  const translatedHeaders = translateHeaders([
    "id",
    "office",
    "category",
    "name",
    "period",
    "total_items",
    "start_date",
    "end_date",
    "cash_amount",
    "currency",
    "created_by",
    "created_at",
    "updated_by",
    "updated_at",
  ]);

  const worksheetData = data.map((item) => ({
    [t("id")]: item.id,
    [t("office")]: item.office_code,
    [t("category")]: item.category_name,
    [t("name")]: item.name,
    [t("period")]: item.period,
    [t("total_items")]: item.items_count,
    [t("start_date")]: formatTimestamp(item.start_date),
    [t("end_date")]: formatTimestamp(item.end_date),
    [t("cash_amount")]: item.cash_amount,
    [t("currency")]: item.currency == "USD" ? t("usd") : t("afn"),
    [t("created_by")]: item.created_by,
    [t("created_at")]: formatTimestamp(item.created_at),
    [t("updated_by")]: item.updated_by,
    [t("updated_at")]: formatTimestamp(item.updated_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: translatedHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, exportTitle);
  XLSX.writeFile(workbook, `${exportTitle}.xlsx`);
};
