import { useTranslation } from "@/app/i18n/client";
import {
  Document,
  Font,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import NotoSans from "../../../public/fonts/NotoSansArabic-Regular.ttf";

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
}
const item = {
  created_at: "2024-05-07T20:12:30.000000Z",
};

// ! Format TimeStamps
function formatTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() returns 0-11, so we add 1
  const year = String(date.getUTCFullYear()).slice(-2); // get last 2 digits of the year

  return `${day}/${month}/${year}`;
}

// ! Register Noto Sans Arabic Google font for English and Persian
// ! Because not every font support Persian
Font.register({
  family: "NotoSans",
  fonts: [
    {
      src: NotoSans,
    },
  ],
});

// ! PDF table styles
const styles = StyleSheet.create({
  page: {
    padding: 4,
    fontFamily: "NotoSans", // Apply the registered font
  },
  header: {
    fontSize: 16,
    fontWeight: "extrabold",
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
    backgroundColor: "#989898",
    fontSize: 10,
    fontWeight: "ultrabold",
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
    fontSize: 10,
  },

  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },

  idCell: {
    width: "8%",
  },

  emailCell: {
    width: "22%",
  },

  userNameCell: {
    width: "12%",
  },
  fullNameCell: {
    width: "18%",
  },
  statusCell: {
    width: "8%",
  },
  createdAtCell: {
    width: "13%",
  },
  createdByCell: {
    width: "12%",
  },
  officeCell: {
    width: "8%",
  },
});

// ! PDF Table
const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({ data, lng }) => {
  const { t } = useTranslation(lng);
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}>{t("users")}</Text>
        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.idCell]}>
              <Text>{t("id")}</Text>
            </View>
            <View style={[styles.tableCell, styles.userNameCell]}>
              <Text>{t("username")}</Text>
            </View>
            <View style={[styles.tableCell, styles.fullNameCell]}>
              <Text>{t("full_name")}</Text>
            </View>
            <View style={[styles.tableCell, styles.emailCell]}>
              <Text>{t("email")}</Text>
            </View>
            <View style={[styles.tableCell, styles.statusCell]}>
              <Text>{t("status")}</Text>
            </View>
            <View style={[styles.tableCell, styles.createdAtCell]}>
              <Text>{t("created_at")}</Text>
            </View>
            <View style={[styles.tableCell, styles.createdByCell]}>
              <Text>{t("created_by")}</Text>
            </View>
            <View style={[styles.tableCell, styles.officeCell]}>
              <Text>{t("office_code")}</Text>
            </View>
          </View>
          {/* Table data */}
          {data.map((item, index) => (
            <View
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
              key={item.id}
            >
              <View style={[styles.tableCell, styles.item, styles.idCell]}>
                <Text>{item.id}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.item, styles.userNameCell]}
              >
                <Text>{item.username}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.item, styles.fullNameCell]}
              >
                <Text>{item.full_name}</Text>
              </View>
              <View style={[styles.tableCell, styles.item, styles.emailCell]}>
                <Text>{item.email}</Text>
              </View>
              <View style={[styles.tableCell, styles.item, styles.statusCell]}>
                <Text>{item.status}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.item, styles.createdAtCell]}
              >
                <Text>{formatTimestamp(item.created_at)}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.item, styles.createdByCell]}
              >
                <Text>{item.created_by}</Text>
              </View>
              <View style={[styles.tableCell, styles.item, styles.officeCell]}>
                <Text>{item.office_code}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// ! Download PDF function
export const handleDownloadPDF = async (data: UserData[], lng: string) => {
  const blob = await pdf(<MyPDFDocument data={data} lng={lng} />).toBlob();
  saveAs(blob, "pdf");
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
