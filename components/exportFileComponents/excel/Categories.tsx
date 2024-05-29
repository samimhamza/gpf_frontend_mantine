import { t } from "i18next";
import * as XLSX from "xlsx";
import { formatTimestamp } from "../FormatDataFunction";

interface CategoriesData {
  id: number;
  name: string;
  status: string;
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
export const handleDownloadExcel = (
  data: CategoriesData[],
  exportTitle: string
) => {
  const translatedHeaders = translateHeaders([
    "id",
    "name",
    "status",
    "created_by",
    "created_at",
    "updated_by",
    "updated_at",
  ]);

  const worksheetData = data.map((category) => ({
    [t("id")]: category.id,
    [t("name")]: category.name,
    [t("status")]: t(category.status),
    [t("created_by")]: category.created_by,
    [t("created_at")]: formatTimestamp(category.created_at),
    [t("updated_by")]: category.updated_by,
    [t("updated_at")]: formatTimestamp(category.updated_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: translatedHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, exportTitle);
  XLSX.writeFile(workbook, `${exportTitle}.xlsx`);
};
