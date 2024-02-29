import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_MOSQUES } from "@/shared/constants/Permissions";

const ProvincesPage = async () => {
	await usePermissionChecker(VIEW_MOSQUES);

	return <div>Provinces Page</div>;
};

export default ProvincesPage;
