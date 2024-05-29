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

// Register Noto Sans Arabic Google font
Font.register({
  family: "NotoSans",
  src: NotoSans,
});

interface CharityPackageData {
  id: number;
  office_code: string;
  category_name: string;
  name: string;
  period: string;
  items_count: number;
  start_date: string;
  end_date: string;
  cash_amount: number;
  currency: string;
}

interface MyPDFDocumentProps {
  data: CharityPackageData[];
  lng: string;
  exportTitle: string;
}

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
    width: "6%",
  },
  officeCodeCell: {
    width: "10%",
  },
  categoryNameCell: {
    width: "15%",
  },
  nameCell: {
    width: "15%",
  },
  periodCell: {
    width: "10%",
  },
  itemsCountCell: {
    width: "12%",
  },
  startDateCell: {
    width: "10%",
  },
  endDateCell: {
    width: "10%",
  },
  cashAmountCell: {
    width: "12%",
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
            <View style={[styles.tableCell, styles.officeCodeCell]}>
              <Text>{t("office")}</Text>
            </View>
            <View style={[styles.tableCell, styles.categoryNameCell]}>
              <Text>{t("category")}</Text>
            </View>
            <View style={[styles.tableCell, styles.nameCell]}>
              <Text>{t("name")}</Text>
            </View>
            <View style={[styles.tableCell, styles.periodCell]}>
              <Text>{t("period")}</Text>
            </View>
            <View style={[styles.tableCell, styles.itemsCountCell]}>
              <Text>{t("total_items")}</Text>
            </View>
            <View style={[styles.tableCell, styles.startDateCell]}>
              <Text>{t("start_date")}</Text>
            </View>
            <View style={[styles.tableCell, styles.endDateCell]}>
              <Text>{t("end_date")}</Text>
            </View>
            <View style={[styles.tableCell, styles.cashAmountCell]}>
              <Text>{t("cash_amount")}</Text>
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
              <View
                style={[styles.tableCell, styles.officeCodeCell, styles.item]}
              >
                <Text>{item.office_code}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.categoryNameCell, styles.item]}
              >
                <Text>{item.category_name}</Text>
              </View>
              <View style={[styles.tableCell, styles.nameCell, styles.item]}>
                <Text>{item.name}</Text>
              </View>
              <View style={[styles.tableCell, styles.periodCell, styles.item]}>
                <Text>{item.period}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.itemsCountCell, styles.item]}
              >
                <Text>{item.items_count}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.startDateCell, styles.item]}
              >
                <Text>{formatTimestamp(item.start_date)}</Text>
              </View>
              <View style={[styles.tableCell, styles.endDateCell, styles.item]}>
                <Text>{formatTimestamp(item.end_date)}</Text>
              </View>
              <View
                style={[styles.tableCell, styles.cashAmountCell, styles.item]}
              >
                <Text>
                  {item.cash_amount}{" "}
                  {item.currency == "USD" ? t("usd") : t("afn")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Download PDF function
export const handleDownloadPDF = async (
  data: CharityPackageData[],
  lng: string,
  exportTitle: string
) => {
  const blob = await pdf(
    <MyPDFDocument data={data} lng={lng} exportTitle={exportTitle} />
  ).toBlob();
  saveAs(blob, t(exportTitle));
};

// Define UI component
const DownloadPDFButton: React.FC<{
  data: CharityPackageData[];
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
