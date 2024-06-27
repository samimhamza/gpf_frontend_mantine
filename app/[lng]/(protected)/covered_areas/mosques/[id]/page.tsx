import { MosqueInfoModule } from "@/components/modules/mosques/MosqueInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const MosquePage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_USERS);

  return <MosqueInfoModule lng={lng} id={id} />;
};

export default MosquePage;
