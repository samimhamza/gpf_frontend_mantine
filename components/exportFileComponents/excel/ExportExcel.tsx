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

// ! Function To Download Excel Table
export const handleDownloadExcel = (data: UserData[]) => {
  console.log("downlaod excel");
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  // Generate binary string and trigger download
  XLSX.writeFile(workbook, "User_data.xlsx");
};
