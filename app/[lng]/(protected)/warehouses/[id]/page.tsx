import { WarehouseModule } from "@/components/modules/warehouses/warehouse/WarehouseModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_WAREHOUSES } from "@/shared/constants/Permissions";

const WarehousePage = async ({
	params: { lng, id },
}: {
	params: {
		lng: string;
		id: number;
	};
}) => {
	await usePermissionChecker(VIEW_WAREHOUSES);

	return <WarehouseModule lng={lng} id={id} />;
};

export default WarehousePage;
