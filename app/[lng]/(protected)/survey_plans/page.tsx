import { SurveyPlansModule } from "@/components/modules/survey_plans";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_APPLICANT_SURVEYS } from "@/shared/constants/Permissions";

const SurveryPlansPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_APPLICANT_SURVEYS);
  return <SurveyPlansModule lng={lng} />;
};

export default SurveryPlansPage;
