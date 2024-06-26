import { InvoiceModule } from "@/components/modules/invoices";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_ITEMS } from "@/shared/constants/Permissions";

const InvoicesPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  await usePermissionChecker(VIEW_ITEMS);

  return <InvoiceModule lng={lng} />;
};

export default InvoicesPage;
