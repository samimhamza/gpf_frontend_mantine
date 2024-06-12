"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import ApplicantRequestInfo from "./ApplicantRequestInfo";

export const ApplicantRequestInfoModule = ({ lng, id }: { lng: string; id: number }) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/general_applicant_requests/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/general_applicant_requests/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("applicant_requests"), link: "/applicant_requests" },
          {
            title: data ? data?.full_name : id.toString(),
          },
        ]}
      />
      <ApplicantRequestInfo
        applicantRequestId={
          data
            ? getID(data?.office?.code, data?.created_at, data?.id)
            : undefined
        }
        databaseID={id}
        lng={lng}
        data={data}
        loading={isLoading}
        mutate={mutate}
      />
    </>
  );
};
