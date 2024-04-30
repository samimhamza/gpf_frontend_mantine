"use client";

import OfficeStepOne from "@/components/modules/offices/OfficeStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { OfficeSchema } from "@/schemas/models/offices";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { IoHome } from "react-icons/io5";

const OfficeModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
  editId,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const officeSchema = OfficeSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    name: "",
    code: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(officeSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/offices",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/offices/${editId}`,
          data: form.values,
        });
    if ((!editId ? status == 201 : status == 202) && response.result) {
      await setMutated(true);
      return true;
    }
    if (status == 422) {
      toast.error(t("editing_not_allowed"));
      close();
      return false;
    }
    toast.error(t("something_went_wrong"));
    return false;
  };

  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status, error } = await callApi({
          method: "GET",
          url: `/offices/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              values[key] = value ? value : initialValues[key];
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId, callApi, form, initialValues]);

  const steps = [
    {
      title: t("office_info"),
      icon: <IoHome size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <OfficeStepOne form={form} lng={lng} />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid();
        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/offices/check_uniqueness",
            data: {
              name: form.values.name,
              code: form.values.code,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              name:
                (response.message == 1 || response.message == 0) &&
                t("value_already_exists"),
              code:
                (response.message == 2 || response.message == 0) &&
                t("value_already_exists"),
            });
            return false;
          } else if (status !== 200) return false;
          return true;
        }
        return res;
      },
    },
  ];
  return (
    <form>
      <CustomModal
        opened={opened}
        close={close}
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

export default OfficeModal;
