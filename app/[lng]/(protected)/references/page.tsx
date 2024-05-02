import { ReferenceModule } from '@/components/modules/references';
import usePermissionChecker from '@/customHooks/usePermissionChecker';
import { VIEW_OFFICES } from '@/shared/constants/Permissions';

const ReferencesPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_OFFICES);
  return <ReferenceModule lng={lng} />;
};

export default ReferencesPage;
