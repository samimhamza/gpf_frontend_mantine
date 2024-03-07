import { ItemModule } from "@/components/modules/items";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ITEMS } from "@/shared/constants/Permissions";

const ItemsPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_ITEMS);
	return <ItemModule lng={lng} />;
};

export default ItemsPage;
