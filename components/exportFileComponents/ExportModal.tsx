"use client";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserShield } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";
import { handleDownloadPDF } from "./pdf/ExportPDF";

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
  const callApi = useAxios();

  const initialValues = {
    downloadType: "",
    downloadSize: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(exportFileSchema),
    validateInputOnBlur: true,
  });

  const { downloadSize, downloadType } = form.values;
  const types = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "excel" },
  ];
  const sizes = [
    { label: "Current Page Data", value: "current" },
    { label: "Current Filter Data", value: "filtered" },
    { label: "All Data", value: "all" },
  ];

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
          <ExportStepOne form={form} lng={lng} types={types} sizes={sizes} />
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
    if (downloadType == "pdf") {
      if (downloadSize == "current") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });

        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng);

          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO LATER
      }
    } else if (downloadType == "excel") {
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
