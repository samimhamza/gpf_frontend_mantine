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
import { t } from "i18next";
import NotoSans from "../../../public/fonts/NotoSansArabic-Regular.ttf";
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

interface MyPDFDocumentProps {
  data: ItemData[];
  lng: string;
  exportTitle: string;
}

// Register Noto Sans Arabic Google font
Font.register({
  family: "NotoSans",
  fonts: [
    {
      src: NotoSans,
    },
  ],
});

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
    justifyContent: "center",
  },
  tableCell: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    justifyContent: "center",
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
    width: "7%",
  },
  nameCell: {
    width: "28%",
  },
  unitCell: {
    width: "9%",
  },
  createdByCell: {
    width: "18%",
  },
  createdAtCell: {
    width: "10%",
  },
  updatedByCell: {
    width: "15%",
  },
  updatedAtCell: {
    width: "13%",
  },
});

const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({
  data,
  lng,
  exportTitle,
}) => {
  const { t } = useTranslation(lng);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{t(exportTitle)}</Text>
        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.idCell]}>
              <Text>{t("id")}</Text>
            </View>
            <View style={[styles.tableCell, styles.nameCell]}>
              <Text>{t("name")}</Text>
            </View>
            <View style={[styles.tableCell, styles.unitCell]}>
              <Text>{t("unit")}</Text>
            </View>
            <View style={[styles.tableCell, styles.createdByCell]}>
              <Text>{t("created_by")}</Text>
            </View>
            <View style={[styles.tableCell, styles.createdAtCell]}>
              <Text>{t("created_at")}</Text>
            </View>
            <View style={[styles.tableCell, styles.updatedByCell]}>
              <Text>{t("updated_by")}</Text>
            </View>
            <View style={[styles.tableCell, styles.updatedAtCell]}>
              <Text>{t("updated_by")}</Text>
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
              <View style={[styles.tableCell, styles.idCell, styles.item]}>
                <Text>{item.id}</Text>
              </View>
              <View style={[styles.tableCell, styles.nameCell, styles.item]}>
                <Text>{item.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.unitCell, styles.item]}>
                <Text>{item.unit}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.createdByCell, styles.item]}
              >
                <Text>{item.created_by}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.createdAtCell, styles.item]}
              >
                <Text>{formatTimestamp(item.created_at)}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.updatedByCell, styles.item]}
              >
                <Text>{item.updated_by}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.updatedAtCell, styles.item]}
              >
                <Text>{formatTimestamp(item.updated_at)}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// ! Download PDF function
export const handleDownloadPDF = async (
  data: ItemData[],
  lng: string,
  exportTitle: string
) => {
  const blob = await pdf(
    <MyPDFDocument data={data} lng={lng} exportTitle={exportTitle} />
  ).toBlob();
  saveAs(blob, t(exportTitle));
};

// ! Define UI component
const DownloadPDFButton: React.FC<{
  data: ItemData[];
  lng: string;
  exportTitle: string;
}> = ({ data, lng, exportTitle }) => {
  return (
    <PDFDownloadLink
      document={
        <MyPDFDocument data={data} lng={lng} exportTitle={exportTitle} />
      }
      fileName="data.pdf"
    >
      {({ loading }) => (loading ? "" : "Download PDF")}
    </PDFDownloadLink>
  );
};
export default DownloadPDFButton;
