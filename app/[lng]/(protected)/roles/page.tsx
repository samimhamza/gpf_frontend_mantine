import { RoleModule } from "@/components/modules/roles";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ROLES } from "@/shared/constants/Permissions";

const RolesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_ROLES);
	return <RoleModule lng={lng} />;
};

export default RolesPage;
