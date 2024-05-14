"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";

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

  const submit = async () => console.log(form.values);

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

  return (
    <form>
      <CustomModal
        opened={anotherOpened}
        close={anotherClose}
        steps={steps}
        form={form}
        submit={submit}
        lng={lng}
        title={title}
        editId={editId}
        width="40%"
      />
    </form>
  );
};

export default ExportModal;
