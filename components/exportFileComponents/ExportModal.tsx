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
  pageNumber,
  url,
  filterData,
  orderBy = {
    column: "created_at",
    order: "desc",
  },
}: {
  anotherOpened: boolean;
  anotherClose: () => void;
  lng: string;
  setMutated: any;
  title: string;
  exportTitle: string;
  pageNumber: number;
  url: string;
  filterData?: any;
  orderBy?: {
    column: string;
    order: "desc" | "asc";
  };
}) => {
  const { t } = useTranslation(lng);
  const exportFileSchema = ExportFileSchema(t);
  const [loading, setLoading] = useState(false);
  const callApi = useAxios();
  const tableDetails = {
    page: 1,
    per_page: -1,
    search: "",
    order_by: orderBy,
    filter_data: filterData ?? {},
  };

  const initialValues = {
    downloadFormat: "",
    downloadSize: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(exportFileSchema),
    validateInputOnBlur: true,
  });

  const isFilterDataEmpty =
    tableDetails.filter_data &&
    Object.keys(tableDetails.filter_data).length === 0 &&
    tableDetails.filter_data.constructor === Object;

  const { downloadSize, downloadFormat } = form.values;
  const sizes = [
    {
      label: (
        <span>
          {t("current_page")}{" "}
          <Text component="span" variant="gradient" size="sm">
            ({pageNumber})
          </Text>
        </span>
      ),
      value: "current",
    },
    {
      label: (
        <span>
          {isFilterDataEmpty ? (
            <Text
              component="span"
              style={{ color: "#adb5bd", fontSize: "15px" }}
              size="sx"
            >
              {t("filtered_data")}
            </Text>
          ) : (
            <Text component="span" style={{ fontSize: "15px" }}>
              {t("filtered_data")}
            </Text>
          )}
        </span>
      ),
      value: "filtered",
    },
    { label: t("all_data"), value: "all" },
  ];

  const closeModal = () => {
    anotherClose();
    setLoading(false);
  };

  const handleFormatSelect = (format: string) => {
    form.setFieldValue("downloadFormat", format);
  };

  const handleDownload = async (
    url: string,
    params: any,
    exportTitle: string,
    handleDownloadFunc: any,
    lng?: string
  ) => {
    setLoading(true);
    const { response, status } = await callApi({ method: "GET", url, params });
    if (status === 200 && response.result) {
      const data = response.data;
      await setMutated(true);
      downloadFormat === "pdf"
        ? handleDownloadFunc(data, lng, exportTitle)
        : handleDownloadFunc(data, exportTitle);
      closeModal();
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (downloadFormat === "pdf" || downloadFormat === "excel") {
      const params =
        downloadSize === "current"
          ? { page: pageNumber }
          : downloadSize === "all"
          ? { per_page: -1 }
          : {
              ...tableDetails,
              filter_data: JSON.stringify(tableDetails.filter_data),
            };
      const handleFunc =
        downloadFormat === "pdf" ? handleDownloadPDF : handleDownloadExcel;
      const lngParam = downloadFormat === "pdf" ? lng : undefined; // Only pass lng when downloading PDF
      return await handleDownload(
        url,
        params,
        exportTitle,
        handleFunc,
        lngParam
      );
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
                style={{ borderRadius: "50%", padding: "10px" }}
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
                style={{ borderRadius: "50%", padding: "10px" }}
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
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

export default ExportModal;
