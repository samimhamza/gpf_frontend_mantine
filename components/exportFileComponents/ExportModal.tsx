"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import useOffice from "@/customHooks/useOffice";
import { ReferenceSchema } from "@/schemas/models/references";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
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
  const referenceSchema = ReferenceSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const initialValues: any = {
    office_id: "",
    first_name: "",
    last_name: "",
    father_name: "",
    position: "",
    job_location: "",
    user_id: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(referenceSchema),
    validateInputOnBlur: true,
  });

  const { offices, office } = useOffice(form);

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/references",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/references/${editId}`,
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

  /*  // ! DO NOT need to fetch by editID
  
  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status, error } = await callApi({
          method: 'GET',
          url: `/references/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (key != 'office_id' && key != 'user_id') {
                values[key] = value ? value : initialValues[key];
              } else if (key == 'office_id' || key == 'user_id') {
                values[key] = value?.toString();
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId]);
*/

  /* // ! Do not need to fetch all user
useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_users",
      });
      if (status == 200 && response.result == true) {
        setUsers(
          response.data.map((item: any) => {
            return { value: item.id.toString(), label: item.username };
          })
        );
      }
    })();
  }, [callApi]);
*/

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
          <ExportStepOne
            offices={offices}
            office={office}
            form={form}
            lng={lng}
            users={users}
          />
        </Box>
      ),

      /* // ! We do not need check uniqueness
      async validate() {
        form.validate();
        let res = form.isValid();
        if (res) {
          let { response, status } = await callApi({
            method: 'POST',
            url: '/references/check_uniqueness',
            data: {
              first_name: form.values.first_name,
              user_id: form.values.user_id,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              user_id:
                (response.message == 1 || response.message == 0) &&
                t('value_already_exists'),
            });
            return false;
          } else if (status !== 200) return false;
          return true;
        }
        return res;
      },
      */
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
      />
    </form>
  );
};

export default ExportModal;
