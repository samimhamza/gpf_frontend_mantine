import { TeacherModule } from "@/components/modules/teachers";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_APPLICANTS } from "@/shared/constants/Permissions";

const TeachersPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_APPLICANTS);
  return <TeacherModule lng={lng} />;
};

export default TeachersPage;
