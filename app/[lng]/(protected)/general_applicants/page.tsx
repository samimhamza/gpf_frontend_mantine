import { GeneralApplicantModule } from "@/components/modules/general_applicants";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ITEMS } from "@/shared/constants/Permissions";

const GeneralApplicantsPage = async ({
  params: { lng, warehouse },
}: {
  params: {
    lng: string;
    warehouse: string;
  };
}) => {
  await usePermissionChecker(VIEW_ITEMS);

  return <GeneralApplicantModule lng={lng} />;
};

export default GeneralApplicantsPage;
