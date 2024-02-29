import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { UserModule } from "@/modules/users";
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
