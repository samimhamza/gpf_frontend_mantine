import { ApplicantRequestInfoModule } from "@/components/modules/applicant_requests/ApplicantRequestInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const ApplicantRequestPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_USERS);

  return <ApplicantRequestInfoModule lng={lng} id={id} />;
};

export default ApplicantRequestPage;
