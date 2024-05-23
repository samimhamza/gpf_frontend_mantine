"use client";
import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Radio,
  RadioGroup,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
import { setTimeout } from "timers";
import { handleDownloadExcel } from "./excel/UserExportExcel";

import { handleDownloadPDF } from "./pdf/UsersExportPDF";

const ExportModal = ({
  anotherOpened,
  anotherClose,
  lng,
  setMutated,
  title,
  exportTitle,
}: {
  anotherOpened: boolean;
  anotherClose: () => void;
  lng: string;
  setMutated: any;
  title: string;
  exportTitle: string;
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
    { label: <FaFilePdf fontSize={40} />, value: "pdf" },
    { label: "Excel", value: "excel" },
  ];
  const sizes = [
    { label: t("current_page_data"), value: "current" },
    { label: t("current_filtered_data"), value: "filtered" },
    { label: t("all_data"), value: "all" },
  ];

  const closeModal = () =>
    setTimeout(() => {
      anotherClose();
    }, 700);

  const handleFormatSelect = (format: string) => {
    form.setFieldValue("downloadFormat", format);
  };

  const handleSubmit = async () => {
    if (downloadFormat == "pdf") {
      if (downloadSize == "current") {
        setLoading(true);
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng, exportTitle);
          closeModal();
          setLoading(false);
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
          closeModal();
          return true;
        }
      }
    } else if (downloadFormat == "excel") {
      if (downloadSize == "current") {
        const { response, status, loading } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(data, exportTitle);
          closeModal();
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
          closeModal();
          return true;
        }
      }
    }

    toast.error(t("something_went_wrong"));
    return false;
  };

  return (
    <Modal opened={anotherOpened} onClose={anotherClose} title={title} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {loading && <h1>Loading...</h1>}
        <Group style={{ marginBottom: 20 }}>
          <ActionIcon
            variant={
              form.values.downloadFormat === "pdf" ? "filled" : "outline"
            }
            size="60px"
            onClick={() => handleFormatSelect("pdf")}
            color="red"
            style={{ border: "none", padding: "4px" }}
          >
            <BsFiletypePdf size={60} />
          </ActionIcon>
          <ActionIcon
            variant={
              form.values.downloadFormat === "excel" ? "filled" : "outline"
            }
            size="60px"
            onClick={() => handleFormatSelect("excel")}
            color="green"
            style={{ border: "none", padding: "4px" }}
          >
            <SiMicrosoftexcel size={60} />
          </ActionIcon>
        </Group>
        {form.errors.downloadFormat && (
          <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {t("form.errors.downloadFormat")}
          </div>
        )}

        <RadioGroup
          value={form.values.downloadSize}
          onChange={(value) => form.setFieldValue("downloadSize", value)}
          label={t("select_data_option")}
          required
          error={form.errors.downloadSize && t("field_required")}
          style={{ marginTop: 20 }}
        >
          {sizes.map((size) => (
            <Radio key={size.value} value={size.value} label={size.label} />
          ))}
        </RadioGroup>

        <Group style={{ marginTop: 20 }}>
          <Button type="submit" loading={loading}>
            {t("submit")}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ExportModal;
