import { t } from "i18next";
import * as XLSX from "xlsx";

interface UserData {
  id: number;
  full_name: string;
  email: string;
  status: string;
  username: string;
  profile: string;
  office_id: number;
  office_code: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

const translateHeaders = (headers: string[]) => {
  return headers.map((header) => t(header));
};

// ! Function To Download Excel Table

export const handleDownloadExcel = (data: UserData[], exportTitle: string) => {
  const translatedHeaders = translateHeaders([
    "id",
    "fullName",
    "email",
    "status",
  ]); // Translate header labels

  const worksheetData = data.map((user) => ({
    [t("id")]: user.id,
    [t("fullName")]: user.full_name,
    [t("email")]: user.email,
    [t("status")]: user.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: translatedHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, exportTitle); // Translate sheet name

  XLSX.writeFile(workbook, `${exportTitle}.xlsx`);
};
