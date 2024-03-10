import { CategoryModule } from "@/components/modules/categories";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_CATEGORIES } from "@/shared/constants/Permissions";

const CategoriesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_CATEGORIES);
	return <CategoryModule lng={lng} />;
};

export default CategoriesPage;
