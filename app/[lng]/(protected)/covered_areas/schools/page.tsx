import { SchoolModule } from "@/components/modules/schools";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
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
