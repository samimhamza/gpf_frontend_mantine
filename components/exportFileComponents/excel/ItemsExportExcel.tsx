import { t } from "i18next";
import * as XLSX from "xlsx";
import { formatTimestamp } from "../FormatDataFunction";

interface ItemData {
  id: number;
  name: string;
  unit: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

// Function to translate headers
const translateHeaders = (headers: string[]) => {
  return headers.map((header) => t(header));
};

// Function to download Excel table
export const handleDownloadExcel = (data: ItemData[], exportTitle: string) => {
  const translatedHeaders = translateHeaders([
    "id",
    "name",
    "unit",
    "created_by",
    "created_at",
    "updated_by",
    "updated_at",
  ]);

  const worksheetData = data.map((item) => ({
    [t("id")]: item.id,
    [t("name")]: item.name,
    [t("unit")]: item.unit,
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
