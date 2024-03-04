import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { TeacherModule } from "@/modules/teachers";
import { VIEW_APPLICANTS } from "@/shared/constants/Permissions";

const SchoolsPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_APPLICANTS);
	return <TeacherModule lng={lng} />;
};

export default SchoolsPage;
