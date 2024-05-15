"use client";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  Document,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";

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

// Sample data for the DataTable
const data = [
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  {
    id: 1,
    username: "johndoe",
    full_name: "John Doe",
    email: "john@example.com",
    status: "active",
    created_at: "2024-05-15 10:00:00",
    created_by: "Admin",
    office: "Head Office",
  },
  {
    id: 2,
    username: "janesmith",
    full_name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    created_at: "2024-05-14 09:30:00",
    created_by: "Manager",
    office: "Branch Office",
  },
  {
    id: 3,
    username: "alicejohnson",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    status: "inactive",
    created_at: "2024-05-13 11:45:00",
    created_by: "Supervisor",
    office: "Regional Office",
  },
  // Add more fake data items as needed
];

const styles = StyleSheet.create({
  page: {
    padding: 4,
  },

  header: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "red",
  },

  tableTitle: {
    fontWeight: 900,
    flex: 1,
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    backgroundColor: "#4aaee8",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderStyle: "solid",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 12,
  },
  tableHeader: {
    backgroundColor: "red",
  },
  tableCell: {
    flex: 1,
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  lastCell: {
    borderRightWidth: 0,
  },
  oddRow: {
    backgroundColor: "#f9f9f9",
  },
});

const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({ data }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.header}>User Data</Text>
      <View style={styles.table}>
        {/* Table header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>ID</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Username</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Full Name</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Email</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Status</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Created At</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Created By</Text>
          </View>
          <View style={[styles.tableCell, styles.lastCell]}>
            <Text>Office</Text>
          </View>
        </View>
        {/* Table data */}
        {data.map((item, index) => (
          <View style={[styles.tableRow]} key={item.id}>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.id}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.username}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.full_name}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.email}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.status}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.created_at}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.created_by}</Text>
            </View>
            <View style={[styles.tableCell, styles.lastCell]}>
              <Text>{item.office}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Define UI component
const DownloadPDFButton: React.FC<{ data: UserData[] }> = ({ data }) => (
  <PDFDownloadLink document={<MyPDFDocument data={data} />} fileName='data.pdf'>
    {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
  </PDFDownloadLink>
);

const ExportModal = ({
  anotherOpened,
  anotherClose,
  lng,
  setMutated,
  title,
  editId,
}: {
  anotherOpened: boolean;
  anotherClose: () => void;
  lng: string;
  setMutated: any;
  title: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const exportFileSchema = ExportFileSchema(t);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    downloadType: "",
    downloadSize: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(exportFileSchema),
    validateInputOnBlur: true,
  });

  const steps = [
    {
      title: t("references_info"),
      icon: <FaUserShield size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <ExportStepOne form={form} lng={lng} />
        </Box>
      ),

      async validate() {
        form.validate();
        let res = form.isValid();
        return res;
      },
    },
  ];

  const submit = () => console.log("hello");

  return (
    <form>
      {false && (
        <CustomModal
          opened={anotherOpened}
          close={anotherClose}
          steps={steps}
          form={form}
          submit={submit}
          lng={lng}
          title={title}
          editId={editId}
          width='40%'
        />
      )}
      <DownloadPDFButton data={data} />
    </form>
  );
};

export default ExportModal;
