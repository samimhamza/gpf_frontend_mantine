"use client";
import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Modal,
  Radio,
  RadioGroup,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
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
    { label: t("current_page"), value: "current" },
    { label: t("filtered_data"), value: "filtered" },
    { label: t("all_data"), value: "all" },
  ];

  const closeModal = () => {
    anotherClose();
    setLoading(false);
  };

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
          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO LATER
        console.log("TODO LATER");
      } else if (downloadSize == "all") {
        setLoading(true);
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
        setLoading(true);
        const { response, status, loading } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(data, exportTitle);
          anotherClose();
          setLoading(false);
          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO Later
        console.log("TODO LATER");
      } else if (downloadSize == "all") {
        setLoading(true);
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
          params: { per_page: -1 },
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(data, exportTitle);
          anotherClose();
          setLoading(false);
          return true;
        }
      }
    }

    toast.error(t("something_went_wrong"));
    return false;
  };

  return (
    <>
      <Modal
        opened={anotherOpened}
        onClose={anotherClose}
        title={`${title} ${exportTitle}`}
        centered
        size="xs"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Divider />
          <Group
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              size="md"
              style={{ margin: 10, fontSize: 16, fontWeight: 500 }}
            >
              {t("file_format")}
            </Text>
            <Group>
              <ActionIcon
                variant={
                  form.values.downloadFormat === "pdf" ? "filled" : "outline"
                }
                size="60px"
                onClick={() => handleFormatSelect("pdf")}
                color="red"
                style={{ border: "none", padding: "6px" }}
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
                style={{ border: "none", padding: "6px" }}
              >
                <SiMicrosoftexcel size={60} />
              </ActionIcon>
            </Group>
          </Group>

          {form.errors.downloadFormat && (
            <div
              style={{ color: "red", textAlign: "center", fontSize: "14px" }}
            >
              {t("field_required")}
            </div>
          )}

          <RadioGroup
            value={form.values.downloadSize}
            onChange={(value) => form.setFieldValue("downloadSize", value)}
            label={t("file_size")}
            required
            error={form.errors.downloadSize && t("field_required")}
            style={{ margin: 20 }}
          >
            {sizes.map((size) => (
              <Radio
                key={size.value}
                value={size.value}
                label={size.label}
                style={{ margin: "10px 0" }}
              />
            ))}
          </RadioGroup>
          <Divider />

          <Group style={{ marginTop: 20 }}>
            <Button
              leftSection={<IoMdDownload size={14} />}
              type="submit"
              loading={loading}
            >
              {t("export")}
            </Button>
          </Group>
        </form>
      </Modal>
      <style jsx global>{`
        .mantine-Modal-title {
          font-size: 18px;
          font-weight: 700
        }
      `}</style>
    </>
  );
};

export default ExportModal;
