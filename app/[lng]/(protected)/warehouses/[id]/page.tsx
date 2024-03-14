import { SingleWarehouse } from "@/components/modules/warehouses/warehouse_items/SingleWarehouse";
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

	return <SingleWarehouse lng={lng} id={id} />;
};

export default WarehousePage;
