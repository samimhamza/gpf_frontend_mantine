'use client';

import { useTranslation } from '@/app/i18n/client';
import CustomBreadCrumb from '@/components/CustomBreadCrumb';
import { useAxios } from '@/customHooks/useAxios';
import { getID } from '@/shared/functions';
import useSWR from 'swr';
import ReferenceInfo from './ReferenceInfo';

export const ReferenceInfoModule = ({
  lng,
  id,
}: {
  lng: string;
  id: number;
}) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/references/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: 'GET',
        url: `/references/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t('dashboard'), link: '/dashboard' },
          { title: t('references'), link: '/references' },
          {
            title: data ? data?.name : id.toString(),
          },
        ]}
      />
      <ReferenceInfo
        databaseID={id}
        lng={lng}
        reference={data}
        loading={isLoading}
        mutate={mutate}
      />
    </>
  );
};
