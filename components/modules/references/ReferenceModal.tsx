'use client';

import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import { useAxios } from '@/customHooks/useAxios';
import { ReferenceSchema } from '@/schemas/models/references';
import { Box, LoadingOverlay } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoHome } from 'react-icons/io5';
import ReferenceStepOne from './ReferenceStepOne';

const ReferenceModal = ({
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
  const referenceSchema = ReferenceSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);

  const initialValues: any = {
    office_id: null,
    first_name: '',
    last_name: '',
    father_name: '',
    position_name: '',
    job_location: '',
    user_id: null,
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(referenceSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: 'POST',
          url: '/references',
          data: form.values,
        })
      : await callApi({
          method: 'PUT',
          url: `/references/${editId}`,
          data: form.values,
        });
    if ((!editId ? status == 201 : status == 202) && response.result) {
      await setMutated(true);
      return true;
    }
    if (status == 422) {
      toast.error(t('editing_not_allowed'));
      close();
      return false;
    }
    toast.error(t('something_went_wrong'));
    return false;
  };

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
              values[key] = value ? value : initialValues[key];
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId]);

  const steps = [
    {
      title: t('references_info'),
      icon: <IoHome size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <ReferenceStepOne form={form} lng={lng} />
        </Box>
      ),

      async validate() {
        form.validate();
        let res = form.isValid();
        if (res) {
          let { response, status } = await callApi({
            method: 'POST',
            url: '/offices/check_uniqueness',
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
                t('value_already_exists'),
              code:
                (response.message == 2 || response.message == 0) &&
                t('value_already_exists'),
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
        width='60%'
      />
    </form>
  );
};

export default ReferenceModal;
