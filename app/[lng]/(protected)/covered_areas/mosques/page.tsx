import { MosqueModule } from "@/components/modules/mosques";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_MOSQUES } from "@/shared/constants/Permissions";

const MosquesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_MOSQUES);
	return <MosqueModule lng={lng} />;
};

export default MosquesPage;
