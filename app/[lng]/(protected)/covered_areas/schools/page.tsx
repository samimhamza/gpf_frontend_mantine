import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { SchoolModule } from "@/modules/schools";
import { VIEW_SCHOOLS } from "@/shared/constants/Permissions";

const SchoolsPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_SCHOOLS);
	return <SchoolModule lng={lng} />;
};

export default SchoolsPage;
