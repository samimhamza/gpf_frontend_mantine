"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import TeamInfo from "./TeamInfo";
import TeamMemberInfo from "./TeamMemberInfo";

export const TeamInfoModule = ({ lng, id }: { lng: string; id: number }) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/teams/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/teams/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("team"), link: "/teams" },
          {
            title: data
              ? getID(data?.office?.code, data?.created_at, data?.id)
              : id.toString(),
          },
        ]}
      />
      <TeamInfo
        teamId={
          data
            ? getID(data?.office?.code, data?.created_at, data?.id)
            : undefined
        }
        databaseID={id}
        lng={lng}
        team={data}
        loading={isLoading}
        mutate={mutate}
      />
      <TeamMemberInfo
        loading={isLoading}
        lng={lng}
        team={data}
        mutate={mutate}
      />
    </>
  );
};
