import { UserModule } from "@/components/modules/users";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const UsersPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_USERS);
	return <UserModule lng={lng} />;
};

export default UsersPage;
