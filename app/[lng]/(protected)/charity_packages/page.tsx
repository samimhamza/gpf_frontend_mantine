import { CharityPackageModule } from "@/components/modules/charity_packages";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_CHARITY_PACKAGES } from "@/shared/constants/Permissions";

const CharityPackagesPage = async ({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) => {
	await usePermissionChecker(VIEW_CHARITY_PACKAGES);
	return <CharityPackageModule lng={lng} />;
};

export default CharityPackagesPage;
