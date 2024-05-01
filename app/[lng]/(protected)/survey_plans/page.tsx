import { SurveyPlansModule } from "@/components/modules/survey_plans";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_SURVEY_PLANS } from "@/shared/constants/Permissions";

const SurveryPlansPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_SURVEY_PLANS);
  return <SurveyPlansModule lng={lng} />;
};

export default SurveryPlansPage;
