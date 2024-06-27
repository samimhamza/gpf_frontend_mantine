import { t } from "i18next";
import * as XLSX from "xlsx";
import { formatTimestamp } from "../FormatDataFunction";

interface WarehouseData {
  id: number;
  name: string;
  office_code: string;
  province_id: number;
  province_name: string;
  province_name_fa: string;
  created_by: string;
  created_at: string;
}

// Function to translate headers
const translateHeaders = (headers: string[]) => {
  return headers.map((header) => t(header));
};

// Function to download Excel table
export const handleDownloadExcel = (
  data: WarehouseData[],
  exportTitle: string
) => {
  const translatedHeaders = translateHeaders([
    "id",
    "name",
    "office",
    // "Province ID",
    "province",
    "created_by",
    "created_at",
  ]);

  const worksheetData = data.map((warehouse) => ({
    [t("id")]: warehouse.id,
    [t("name")]: warehouse.name,
    [t("office")]: warehouse.office_code,
    [t("province") + " " + t("id")]: warehouse.province_id,
    [t("province")]:
      t("province") == "Province"
        ? warehouse.province_name
        : warehouse.province_name_fa,
    [t("created_by")]: warehouse.created_by,
    [t("created_at")]: formatTimestamp(warehouse.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: translatedHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, exportTitle);
  XLSX.writeFile(workbook, `${exportTitle}.xlsx`);
};
