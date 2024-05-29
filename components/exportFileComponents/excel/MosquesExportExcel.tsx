import { t } from "i18next";
import * as XLSX from "xlsx";
import { formatTimestamp } from "../FormatDataFunction";

interface MosqueData {
  id: number;
  office_code: string;
  name: string;
  province_name: string;
  district_name: string;
  mosque_type: string;
  mosque_formal: string;
  created_by: string;
  created_at: string;
}

// Function to translate headers
const translateHeaders = (headers: string[]) => {
  return headers.map((header) => t(header));
};

// Function to download Excel table
export const handleDownloadExcel = (
  data: MosqueData[],
  exportTitle: string
) => {
  const translatedHeaders = translateHeaders([
    "id",
    "office",
    "name",
    "province",
    "district",
    "mosque_type",
    "mosque_formal",
    "created_by",
    "created_at",
  ]);

  const worksheetData = data.map((mosque) => ({
    [t("id")]: mosque.id,
    [t("office")]: mosque.office_code,
    [t("name")]: mosque.name,
    [t("province")]: mosque.province_name,
    [t("district")]: mosque.district_name,
    [t("mosque_type")]: mosque.mosque_type,
    [t("mosque_formal")]: mosque.mosque_formal,
    [t("created_by")]: mosque.created_by,
    [t("created_at")]: formatTimestamp(mosque.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: translatedHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, exportTitle);
  XLSX.writeFile(workbook, `${exportTitle}.xlsx`);
};
