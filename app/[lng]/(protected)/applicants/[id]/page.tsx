import { ApplicantModule } from "@/components/modules/applicants/applicant/ApplicantModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_APPLICANTS } from "@/shared/constants/Permissions";

const WarehousePage = async ({
	params: { lng, id },
}: {
	params: {
		lng: string;
		id: number;
	};
}) => {
	await usePermissionChecker(VIEW_APPLICANTS);

	return <ApplicantModule lng={lng} id={id} />;
};

export default WarehousePage;
