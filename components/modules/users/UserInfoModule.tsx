"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import UserInfo from "./UserInfo";

export const UserInfoModule = ({ lng, id }: { lng: string; id: number }) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/users/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/users/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("users"), link: "/users" },
          {
            title: data ? data?.full_name : id.toString(),
          },
        ]}
      />
      <UserInfo
        userId={
          data
            ? getID(data?.office?.code, data?.created_at, data?.id)
            : undefined
        }
        databaseID={id}
        lng={lng}
        user={data}
        loading={isLoading}
        mutate={mutate}
      />
    </>
  );
};
