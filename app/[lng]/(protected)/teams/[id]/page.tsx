import { TeamInfoModule } from "@/components/modules/teams/TeamInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_TEAMS } from "@/shared/constants/Permissions";

const TeamPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_TEAMS);

  return <TeamInfoModule lng={lng} id={id} />;
};

export default TeamPage;
