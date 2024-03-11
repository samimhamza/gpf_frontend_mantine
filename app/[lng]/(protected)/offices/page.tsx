import { OfficeModule } from "@/components/modules/offices";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_OFFICES } from "@/shared/constants/Permissions";

const OfficesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_OFFICES);
	return <OfficeModule lng={lng} />;
};

export default OfficesPage;
