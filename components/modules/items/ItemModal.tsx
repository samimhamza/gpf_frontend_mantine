"use client";

import ItemStepOne from "@/components/modules/items/ItemStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { ItemSchema } from "@/schemas/models/items";
import { BiSolidBox } from "react-icons/bi";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const ItemModal = ({
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
  const itemSchema = ItemSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    name: "",
    unit: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(itemSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/items",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/items/${editId}`,
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
          url: `/items/${editId}`,
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
      title: t("item_info"),
      icon: <BiSolidBox size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <ItemStepOne form={form} lng={lng} />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid("name") && form.isValid("unit");

        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/items/check_uniqueness",
            data: {
              name: form.values.name,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              name: response.message == 0 && t("value_already_exists"),
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
      />
    </form>
  );
};

export default ItemModal;
