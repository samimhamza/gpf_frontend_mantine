import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_MOSQUES } from "@/shared/constants/Permissions";

const DistrictsPage = async () => {
	await usePermissionChecker(VIEW_MOSQUES);
	return <div>Districts Page</div>;
};

export default DistrictsPage;
