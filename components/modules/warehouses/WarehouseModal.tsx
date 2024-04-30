"use client";

import WarehouseStepOne from "@/components/modules/warehouses/WarehouseStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { WarehouseSchema } from "@/schemas/models/warehouses";
import { MdInventory } from "react-icons/md";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import useOffice from "@/customHooks/useOffice";

const WarehouseModal = ({
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
  const warehouseSchema = WarehouseSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);

  const initialValues: any = {
    name: "",
    office_id: "",
    province_id: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(warehouseSchema),
    validateInputOnBlur: true,
  });
  const { offices, office } = useOffice(form);

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/warehouses",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/warehouses/${editId}`,
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
          url: `/warehouses/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (key != "office_id" && key != "province_id") {
                values[key] = value ? value : initialValues[key];
              }
              if ((key == "office_id" || key == "province_id") && value) {
                values[key] = value.toString();
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_provinces",
      });
      if (status == 200 && response.result == true) {
        setProvinces(
          response.data.map((item: any) => {
            return { value: item.id.toString(), label: item.name_fa };
          })
        );
      }
    })();
  }, []);

  const steps = [
    {
      title: t("warehouse_info"),
      icon: <MdInventory size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <WarehouseStepOne
            form={form}
            lng={lng}
            offices={offices}
            provinces={provinces}
            office={office}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res =
          form.isValid("name") &&
          form.isValid("office_id") &&
          form.isValid("province_id");

        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/warehouses/check_uniqueness",
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

export default WarehouseModal;
