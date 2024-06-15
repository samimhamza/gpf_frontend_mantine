import { GeneralApplicantInfoModule } from "@/components/modules/general_applicants/GeneralApplicantInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const GeneralApplicantPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_USERS);

  return <GeneralApplicantInfoModule lng={lng} id={id} />;
};

export default GeneralApplicantPage;
