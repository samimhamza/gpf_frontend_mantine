import { EmployeeModule } from "@/components/modules/employees";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_EMPLOYEES } from "@/shared/constants/Permissions";

const EmployeesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_EMPLOYEES);
	return <EmployeeModule lng={lng} />;
};

export default EmployeesPage;
