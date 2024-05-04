import { SchoolInfoModule } from "@/components/modules/schools/SchoolInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const UserPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_USERS);

  return <SchoolInfoModule lng={lng} id={id} />;
};

export default UserPage;
