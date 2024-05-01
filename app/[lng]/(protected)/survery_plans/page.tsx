import { TeamModule } from "@/components/modules/teams";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_TEAMS } from "@/shared/constants/Permissions";

const SurveryPlansPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_TEAMS);
  return <TeamModule lng={lng} />;
};

export default SurveryPlansPage;
