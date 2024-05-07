import { ReferenceInfoModule } from '@/components/modules/references/ReferenceInfoModule';
import usePermissionChecker from '@/customHooks/usePermissionChecker';
import { VIEW_REFERENCES } from '@/shared/constants/Permissions';

const TeamPage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_REFERENCES);

  return <ReferenceInfoModule lng={lng} id={id} />;
};

export default TeamPage;
