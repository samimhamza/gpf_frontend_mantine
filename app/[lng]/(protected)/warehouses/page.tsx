import { WarehouseModule } from "@/components/modules/warehouses";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_WAREHOUSES } from "@/shared/constants/Permissions";

const WarehousesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_WAREHOUSES);
	return <WarehouseModule lng={lng} />;
};

export default WarehousesPage;
