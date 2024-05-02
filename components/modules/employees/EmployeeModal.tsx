'use client';

import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import EmployeeStepOne from '@/components/modules/employees/EmployeeStepOne';
import { useAxios } from '@/customHooks/useAxios';
import { EmployeeSchema } from '@/schemas/models/employees';
import { getFormData, getTimeValue } from '@/shared/functions';
import { Box, LoadingOverlay } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { CiViewList } from 'react-icons/ci';
import { TbUserCircle } from 'react-icons/tb';
import { Value } from 'react-multi-date-picker';
import EmployeeStepTwo from './EmployeeStepTwo';

const EmployeeModal = ({
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
  const employeeSchema = EmployeeSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState([]);
  const profileUrl = useRef<any>(null);
  const [startDateErrorMessage, setStartDateErrorMessage] = useState('');
  const [startDate, setStartDate] = useState<Value>();
  const [endDateErrorMessage, setEndDateErrorMessage] = useState('');
  const [endDate, setEndDate] = useState<Value>();

  const initialValues: any = {
    profile: '',
    office_id: '',
    first_name: '',
    last_name: '',
    father_name: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    job_title: '',
    start_date: null,
    end_date: null,
    salary: '',
    currency: '',
    description: '',
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(employeeSchema),
    validateInputOnBlur: true,
  });

  const submit = async () => {
    const values = getFormData(form.values);
    const { response, status } = !editId
      ? await callApi({
          method: 'POST',
          url: '/employees',
          data: values,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      : await callApi({
          method: 'POST',
          url: `/employees/${editId}?_method=PUT`,
          data: values,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
    (async function () {
      const { response, status, error } = await callApi({
        method: 'GET',
        url: '/all_offices',
      });
      if (status == 200 && response.result == true) {
        setOffices(
          response.data.map((item: any) => {
            return {
              value: item.id.toString(),
              label: item.name + ' (' + item.code + ')',
            };
          })
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status, error } = await callApi({
          method: 'GET',
          url: `/employees/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (key != 'office_id' && key != 'profile') {
                values[key] = value ? value : initialValues[key];
              } else if (key == 'office_id' && value) {
                values[key] = value.toString();
              } else if (key == 'profile' && value) {
                profileUrl.current = value;
              }
            }
            if (Array.isArray(value) && value.length) {
              if (key == 'contracts') {
                Object.entries(value[0]).forEach(([key, contractValue]) => {
                  if (Object.keys(initialValues).includes(key)) {
                    if (
                      key != 'start_date' &&
                      key != 'end_date' &&
                      key != 'salary'
                    ) {
                      values[key] = contractValue
                        ? contractValue
                        : initialValues[key];
                    } else if (key == 'salary' && contractValue) {
                      values[key] = contractValue.toString();
                    } else if (key == 'start_date' && contractValue) {
                      setStartDate(getTimeValue(contractValue.toString()));
                    } else if (key == 'end_date' && contractValue) {
                      setEndDate(getTimeValue(contractValue.toString()));
                    }
                  }
                });
              }
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
      title: t('personal_info'),
      icon: <TbUserCircle size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <EmployeeStepOne
            form={form}
            lng={lng}
            profileUrl={profileUrl}
            offices={offices}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res =
          form.isValid('first_name') &&
          form.isValid('last_name') &&
          form.isValid('father_name') &&
          form.isValid('gender') &&
          form.isValid('office_id');
        return res;
      },
    },
    {
      title: t('contract_details'),
      icon: <CiViewList size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <EmployeeStepTwo
            form={form}
            lng={lng}
            startDateErrorMessage={startDateErrorMessage}
            setStartDateErrorMessage={setStartDateErrorMessage}
            endDateErrorMessage={endDateErrorMessage}
            setEndDateErrorMessage={setEndDateErrorMessage}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        if (!form.values.start_date) {
          setStartDateErrorMessage(t('field_required'));
        }
        let res =
          form.isValid('job_title') &&
          form.isValid('salary') &&
          form.isValid('currency') &&
          form.isValid('phone') &&
          form.isValid('email') &&
          form.values.start_date;
        if (res) {
          let { response, status } = await callApi({
            method: 'POST',
            url: '/employees/check_uniqueness',
            data: {
              email: form.values.email,
              phone: form.values.phone,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              phone:
                (response.message == 1 || response.message == 0) &&
                t('value_already_exists'),
              email:
                (response.message == 2 || response.message == 0) &&
                t('email_already_exists'),
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

export default EmployeeModal;
