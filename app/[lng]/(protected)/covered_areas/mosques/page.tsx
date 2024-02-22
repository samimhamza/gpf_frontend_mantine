import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_MOSQUES } from "@/shared/constants/Permissions";

const MosquesPage = async () => {
	await usePermissionChecker(VIEW_MOSQUES);

	return <div>Mosques Page</div>;
};

export default MosquesPage;
