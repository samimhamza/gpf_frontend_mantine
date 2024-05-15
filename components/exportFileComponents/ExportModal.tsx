"use client";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";
import { handleDownloadPDF } from "./pdf/ExportPDF";

// Sample data for the DataTable
const data = [
  {
    id: 9999,
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

  const handleSubmit = () => {
    handleDownloadPDF(data);
  };

  return (
    <form>
      <CustomModal
        opened={anotherOpened}
        close={anotherClose}
        steps={steps}
        form={form}
        submit={handleSubmit}
        lng={lng}
        title={title}
        editId={editId}
        width='40%'
      />
    </form>
  );
};

export default ExportModal;
