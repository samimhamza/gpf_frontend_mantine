"use client";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFileDownload } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";
import { handleDownloadExcel } from "./excel/UserExportExcel";
import { handleDownloadPDF } from "./pdf/UsersExportPDF";

const ExportModal = ({
  anotherOpened,
  anotherClose,
  lng,
  setMutated,
  title,
  editId,
  exportTitle,
}: {
  anotherOpened: boolean;
  anotherClose: () => void;
  lng: string;
  setMutated: any;
  title: string;
  exportTitle: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const exportFileSchema = ExportFileSchema(t);
  const [loading, setLoading] = useState(false);
  const callApi = useAxios();

  const initialValues = {
    downloadFormat: "",
    downloadSize: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(exportFileSchema),
    validateInputOnBlur: true,
  });

  const { downloadSize, downloadFormat } = form.values;
  const formats = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "excel" },
  ];
  const sizes = [
    { label: t("current_page_data"), value: "current" },
    { label: t("current_filtered_data"), value: "filtered" },
    { label: t("all_data"), value: "all" },
  ];

  const steps = [
    {
      title: t("exportFile_info"),
      icon: <FaFileDownload size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <ExportStepOne
            form={form}
            lng={lng}
            formats={formats}
            sizes={sizes}
          />
        </Box>
      ),

      async validate() {
        form.validate();
        let res = form.isValid();
        return res;
      },
    },
  ];

  const handleSubmit = async () => {
    if (downloadFormat == "pdf") {
      if (downloadSize == "current") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng, exportTitle);
          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO LATER
        console.log("TODO LATER");
      } else if (downloadSize == "all") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
          params: { per_page: -1 },
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng, exportTitle);
          return true;
        }
      }
    } else if (downloadFormat == "excel") {
      if (downloadSize == "current") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(data, exportTitle);
          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO Later
        console.log("TODO LATER");
      } else if (downloadSize == "all") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
          params: { per_page: -1 },
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(data, exportTitle);
          return true;
        }
      }
    }

    toast.error(t("something_went_wrong"));
    return false;
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
