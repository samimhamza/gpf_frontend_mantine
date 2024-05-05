'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, Select, TextInput } from '@mantine/core';

interface ReferenceStepOneProps {
  form: any;
  lng: string;
  offices: Array<{ value: string; label: string }>;
  office: string | null;
  users: Array<{ value: string; label: string }>;
  user: string | null;
}

const ReferenceStepOne = ({
  form,
  lng,
  office,
  offices,
  user,
  users,
}: ReferenceStepOneProps) => {
  const { t } = useTranslation(lng);

  // ! Sorted by id
  const sortedUserById = users.sort(
    (a: { value: any }, b: { value: any }) => a.value - b.value
  );

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
        justify={{ sm: 'left' }}
      >
        {office == 'all' && (
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap='sm'
            p='sm'
            justify={{ sm: 'center' }}
          >
            <Select
              style={{ flex: 1 }}
              label={t('office')}
              placeholder={t('office')}
              withAsterisk
              data={offices}
              searchable
              clearable
              nothingFoundMessage={t('noting_found')}
              // onSearchChange={handleSearch}
              // rightSection={loading && <Loader color="primary" size={15} />}
              {...form.getInputProps('office_id')}
            />
          </Flex>
        )}
        {user == 'all' && (
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap='sm'
            p='sm'
            justify={{ sm: 'left' }}
          >
            <Select
              style={{ flex: 2 }}
              label={t('user')}
              placeholder={t('user')}
              withAsterisk
              data={sortedUserById}
              searchable
              clearable
              nothingFoundMessage={t('noting_found')}
              // onSearchChange={handleSearch}
              // rightSection={loading && <Loader color="primary" size={15} />}
              {...form.getInputProps('user_id')}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ReferenceStepOne;
