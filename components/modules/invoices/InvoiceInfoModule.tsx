"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import InvoiceInfo from "./InvoiceInfo";

export const InvoiceInfoModule = ({ lng, id }: { lng: string; id: number }) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/invoices/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/invoices/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("invoices"), link: "/invoices" },
          {
            title: data ? data?.name : id.toString(),
          },
        ]}
      />
      <InvoiceInfo
        invoiceId={
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
