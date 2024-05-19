"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import SchoolInfo from "./SchoolInfo";

export const SchoolInfoModule = ({ lng, id }: { lng: string; id: number }) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/users/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/schools/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("schools"), link: "/covered_areas/schools" },
          {
            title: data ? data?.name : id.toString(),
          },
        ]}
      />
      <SchoolInfo
        schoolId={
          data
            ? getID(data?.office?.code, data?.created_at, data?.id)
            : undefined
        }
        databaseID={id}
        lng={lng}
        school={data}
        loading={isLoading}
        mutate={mutate}
      />
    </>
  );
};
