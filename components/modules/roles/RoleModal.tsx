"use client";

import RoleStepOne from "@/components/modules/roles/RoleStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { RoleSchema } from "@/schemas/models/roles";
import { BiSolidBox } from "react-icons/bi";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const RoleModal = ({
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
  const roleSchema = RoleSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [totalPermissions, setTotalPermissions] = useState<number>(0);

  const initialValues: any = useMemo(() => {
    return {
      name: "",
      permissions: [],
    };
  }, []);

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(roleSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/roles",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/roles/${editId}`,
          data: form.values,
        });
    if ((!editId ? status == 201 : status == 202) && response.result) {
      await setMutated(true);
      return true;
    }
    if (status == 226) {
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
        const { response, status } = await callApi({
          method: "GET",
          url: `/roles/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          values.permissions = [];
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (key != "permissions")
                values[key] = value ? value : initialValues[key];
            }
            if (Array.isArray(value) && value.length) {
              if (key == "permissions") {
                value.forEach((item: any) => {
                  values.permissions.push(item.id);
                });
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId, callApi, form, initialValues]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/grouped_permissions",
      });
      if (status == 200 && response.result == true) {
        setPermissions(response.data);
        setTotalPermissions(response.total);
      }
      setLoading(false);
    })();
  }, [callApi]);

  const steps = [
    {
      title: t("role_info"),
      icon: <BiSolidBox size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <RoleStepOne
            form={form}
            lng={lng}
            permissions={permissions}
            totalPermissions={totalPermissions}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid("name");

        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/roles/check_uniqueness",
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

export default RoleModal;
