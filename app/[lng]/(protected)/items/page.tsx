import { ItemModule } from "@/components/modules/items";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ITEMS } from "@/shared/constants/Permissions";

const ItemsPage = async ({
	params: { lng, warehouse },
}: {
	params: {
		lng: string;
		warehouse: string;
	};
}) => {
	await usePermissionChecker(VIEW_ITEMS);
	console.log(warehouse);

	return <ItemModule lng={lng} />;
};

export default ItemsPage;
