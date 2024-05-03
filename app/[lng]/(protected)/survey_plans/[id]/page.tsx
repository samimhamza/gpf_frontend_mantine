import { SurveyPlanInfoModule } from "@/components/modules/survey_plans/SurveyPlanInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_SURVEY_PLANS } from "@/shared/constants/Permissions";

const SurveryPlanPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_SURVEY_PLANS);

  return <SurveyPlanInfoModule lng={lng} id={id} />;
};

export default SurveryPlanPage;
