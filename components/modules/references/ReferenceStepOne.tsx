'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, TextInput } from '@mantine/core';

interface ReferenceStepOneProps {
  form: any;
  lng: string;
}

const ReferenceStepOne = ({ form, lng }: ReferenceStepOneProps) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap='sm'
        p='sm'
        justify={{ sm: 'center' }}
      >
        <TextInput
          style={{ flex: 1 }}
          label={t('first_name')}
          placeholder={t('first_name')}
          withAsterisk
          {...form.getInputProps('first_name')}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t('last_name')}
          placeholder={t('last_name')}
          withAsterisk
          {...form.getInputProps('last_name')}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t('father_name')}
          placeholder={t('father_name')}
          withAsterisk
          {...form.getInputProps('father_name')}
        />
      </Flex>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap='sm'
        p='sm'
        justify={{ sm: 'center' }}
      >
        <TextInput
          style={{ flex: 1 }}
          label={t('job_location')}
          placeholder={t('job_location')}
          withAsterisk
          {...form.getInputProps('job_location')}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t('position_name')}
          placeholder={t('position_name')}
          withAsterisk
          {...form.getInputProps('position_name')}
        />
      </Flex>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap='sm'
        p='sm'
        justify={{ sm: 'center' }}
      >
        <TextInput
          style={{ flex: 1 }}
          label={t('office_id')}
          placeholder={t('office_id')}
          withAsterisk
          {...form.getInputProps('office_id')}
        />
        <TextInput
          style={{ flex: 1 }}
          label={t('user_id')}
          placeholder={t('user_id')}
          withAsterisk
          {...form.getInputProps('user_id')}
        />
      </Flex>
    </>
  );
};

export default ReferenceStepOne;
