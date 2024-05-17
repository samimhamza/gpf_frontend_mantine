import { useTranslation } from "@/app/i18n/client";
import {
  Document,
  Font,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Define types for data
interface UserData {
  id: number;
  full_name: string;
  email: string;
  status: string;
  username: string;
  created_at: string;
  created_by: string;
  office_code: string;
}
interface MyPDFDocumentProps {
  data: UserData[];
  lng: string;
} // Register Noto Naskh Arabic font for English and Persian

// ! Register Vazir font for English and Persian

Font.register({
  family: "NotoNaskhArabic",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/notosansarabic/v18/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4o.woff2",
      fontWeight: "normal",
    },
  ],
});

// ! PDF table styles
const styles = StyleSheet.create({
  page: {
    padding: 4,
    // fontFamily: "NotoNaskhArabic", // Apply the registered font
  },
  header: {
    fontSize: 16,
    // fontWeight: "extrabold",
    margin: 10,
    textAlign: "center",
    color: "black",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderStyle: "solid",
    overflow: "hidden",
  },
  tableHeader: {
    width: "100%",
    backgroundColor: "cyan",
    fontSize: 10,
    // fontWeight: "ultrabold",
  },

  tableCell: {
    // flex: 1,
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },

  tableRow: {
    flexDirection: "row",
    fontSize: 12,
  },

  item: {
    fontSize: 8,
  },

  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },

  idCell: {
    width: "5%",
  },

  emailCell: {
    width: "20%",
  },

  userNameCell: {
    width: "12%",
  },
  fullNameCell: {
    width: "16%",
  },
  statusCell: {
    width: "8%",
  },
  createdAtCell: {
    width: "15%",
  },
  createdByCell: {
    width: "12%",
  },
  officeCell: {
    width: "13%",
  },
});

// ! PDF Table
const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({ data, lng }) => {
  const { t } = useTranslation(lng);
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}> {t("users")}</Text>
      </Page>
    </Document>
  );
};

// ! Define UI component
const DownloadPDFButton: React.FC<{ data: UserData[]; lng: string }> = ({
  data,
  lng,
}) => {
  return (
    <PDFDownloadLink
      document={<MyPDFDocument data={data} lng={lng} />}
      fileName='data.pdf'
    >
      {({ loading }) => (loading ? "" : "Download PDF")}
    </PDFDownloadLink>
  );
};
export default DownloadPDFButton;

// ! Download PDF function
export const handleDownloadPDF = async (data: UserData[], lng: string) => {
  const blob = await pdf(<MyPDFDocument data={data} lng={lng} />).toBlob();
  saveAs(blob, "dfsg");
};
