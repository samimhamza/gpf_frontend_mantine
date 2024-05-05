"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import useSWR from "swr";
import { getID } from "@/shared/functions";
import SurveyPlanInfo from "./SurveyPlanInfo";
import SurveyPlanQuestionsInfo from "./SurveyPlanQuestionsInfo";

export const SurveyPlanInfoModule = ({
  lng,
  id,
}: {
  lng: string;
  id: number;
}) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();

  const { data, error, isLoading, mutate } = useSWR(
    `/survey_plans/${id}`,
    async () => {
      const { response, error, status } = await callApi({
        method: "GET",
        url: `/survey_plans/${id}`,
      });
      return response?.data;
    }
  );

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t("dashboard"), link: "/dashboard" },
          { title: t("survey_plan"), link: "/survey_plans" },
          {
            title: data ? data?.title : id.toString(),
          },
        ]}
      />
      <SurveyPlanInfo
        surveyPlanId={
          data
            ? getID(data?.office?.code, data?.created_at, data?.id)
            : undefined
        }
        databaseID={id}
        lng={lng}
        surveyPlan={data}
        loading={isLoading}
        mutate={mutate}
      />
      <SurveyPlanQuestionsInfo lng={lng} loading={isLoading} data={data} />
    </>
  );
};
