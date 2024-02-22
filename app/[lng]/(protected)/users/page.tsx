import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const UsersPage = async () => {
	await usePermissionChecker(VIEW_USERS);
	return <div>HI</div>;
};

export default UsersPage;
