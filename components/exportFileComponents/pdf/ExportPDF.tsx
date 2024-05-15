import {
  Document,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
// Define types for data
interface UserData {
  id: number;
  full_name: string;
  email: string;
  status: string;
  username: string;
  created_at: string;
  created_by: string;
  office: string;
}
interface MyPDFDocumentProps {
  data: UserData[];
}

// ! PDF table styles
const styles = StyleSheet.create({
  page: {
    padding: 4,
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
    backgroundColor: "cyan",
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
const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header}>{t("users")}</Text>
        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.idCell]}>
              <Text>ID</Text>
            </View>
            <View style={[styles.tableCell, styles.userNameCell]}>
              <Text>Username</Text>
            </View>
            <View style={[styles.tableCell, styles.fullNameCell]}>
              <Text>Full Name</Text>
            </View>
            <View style={[styles.tableCell, styles.emailCell]}>
              <Text>Email</Text>
            </View>
            <View style={[styles.tableCell, styles.statusCell]}>
              <Text>Status</Text>
            </View>
            <View style={[styles.tableCell, styles.createdAtCell]}>
              <Text>Created At</Text>
            </View>
            <View style={[styles.tableCell, styles.createdByCell]}>
              <Text>Created By</Text>
            </View>
            <View style={[styles.tableCell, styles.officeCell]}>
              <Text>Office</Text>
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
                <Text>{item.created_at}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.item, styles.createdByCell]}
              >
                <Text>{item.created_by}</Text>
              </View>
              <View style={[styles.tableCell, styles.item, styles.officeCell]}>
                <Text>{item.office}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// ! Define UI component
const DownloadPDFButton: React.FC<{ data: UserData[] }> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<MyPDFDocument data={data} />}
      fileName='data.pdf'
    >
      {({ loading }) => (loading ? "" : "Download PDF")}
    </PDFDownloadLink>
  );
};
export default DownloadPDFButton;

// ! Download PDF function
export const handleDownloadPDF = async (data: any) => {
  const blob = await pdf(<MyPDFDocument data={data} />).toBlob();
  saveAs(blob, "untitled.pdf");
};
