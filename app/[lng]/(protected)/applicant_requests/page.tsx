import { ApplicantRequestModule } from "@/components/modules/applicant_requests";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ITEMS } from "@/shared/constants/Permissions";

const ApplicantRequestsPage = async ({
  params: { lng, warehouse },
}: {
  params: {
    lng: string;
    warehouse: string;
  };
}) => {
  await usePermissionChecker(VIEW_ITEMS);

  return <ApplicantRequestModule lng={lng} />;
};

export default ApplicantRequestsPage;
