"use client";

import UserStepOne from "@/components/modules/users/UserStepOne";
import UserStepTwo from "@/components/modules/users/UserStepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { EditUserSchema, CreateUserSchema } from "@/schemas/models/users";
import { TbUserCircle } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { getFormData } from "@/shared/functions";
import useOffice from "@/customHooks/useOffice";

const UserModal = ({
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
  const createUserSchema = CreateUserSchema(t);
  const editUserSchema = EditUserSchema(t);
  const callApi = useAxios();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPermissions, setTotalPermissions] = useState<number>(0);
  const profileUrl = useRef<any>(null);

  const createInitialValues = {
    full_name: "",
    email: "",
    username: "",
    profile: "",
    office_id: "",
    password: "",
    confirm_password: "",
    roles: [],
    permissions: [],
  };
  const editInitialValues: any = useMemo(() => {
    return {
      full_name: "",
      email: "",
      username: "",
      profile: "",
      office_id: "",
      roles: [],
      permissions: [],
    };
  }, []);

  const form = useForm({
    initialValues: !editId ? createInitialValues : editInitialValues,
    validate: zodResolver(!editId ? createUserSchema : editUserSchema),
    validateInputOnBlur: true,
  });

  const { offices, office, setOffices } = useOffice(form);

  const submit = async () => {
    const values = getFormData(form.values);

    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/users",
          data: values,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      : await callApi({
          method: "POST",
          url: `/users/${editId}?_method=PUT`,
          data: values,
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
          url: `/users/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          values.permissions = [];
          values.roles = [];
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(editInitialValues).includes(key)) {
              if (key != "permissions" && key != "roles" && key != "office_id")
                values[key] = value ? value : editInitialValues[key];
            }
            if (key == "office_id" && value) {
              values[key] = value.toString();
            }
            if (key == "profile" && value) {
              profileUrl.current = value;
            }
            if (Array.isArray(value) && value.length) {
              if (key == "permissions") {
                value.forEach((item: any) => {
                  values.permissions.push(item.id);
                });
              }
              if (key == "roles") {
                value.forEach((item: any) => {
                  values.roles.push(item.name);
                });
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId, callApi, editInitialValues]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_roles",
        // url: "/office/auto_complete",
      });
      if (status == 200 && response.result == true) {
        setRoles(
          response.data.map((item: any) => {
            return { value: item.name, label: item.name };
          })
        );
      }
    })();
  }, [callApi]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/grouped_permissions",
      });
      if (status == 200 && response.result == true) {
        setPermissions(response.data);
        setTotalPermissions(response.total);
      }
    })();
  }, [callApi]);

  const steps = [
    {
      title: t("user_info"),
      icon: <TbUserCircle size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <UserStepOne
            form={form}
            lng={lng}
            offices={offices}
            setOffices={setOffices}
            editId={editId}
            profileUrl={profileUrl}
            office={office}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res =
          form.isValid("full_name") &&
          form.isValid("office_id") &&
          form.isValid("email") &&
          form.isValid("username");
        if (!editId) {
          res =
            res && form.isValid("password") && form.isValid("confirm_password");
        }

        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/users/check_uniqueness",
            data: {
              email: form.values.email,
              username: form.values.username,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              email:
                (response.message == 1 || response.message == 0) &&
                t("email_already_exists"),
              username:
                (response.message == 2 || response.message == 0) &&
                t("username_already_exists"),
            });
            return false;
          } else if (status !== 200) return false;
          return true;
        }
        return false;
      },
    },
    {
      title: t("authorizations"),
      icon: <TbShieldCheck size={22} />,
      step: (
        <UserStepTwo
          roles={roles}
          permissions={permissions}
          form={form}
          lng={lng}
          totalPermissions={totalPermissions}
        />
      ),
      async validate() {
        return true;
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

export default UserModal;
