import { InvoiceInfoModule } from "@/components/modules/invoices/InvoiceInfoModule";
import usePermissionChecker from "@/customHooks/usePermissionChecker";
import { VIEW_USERS } from "@/shared/constants/Permissions";

const InvoicePage = async ({
  params: { lng, id },
}: {
  params: {
    lng: string;
    id: number;
  };
}) => {
  await usePermissionChecker(VIEW_USERS);

  return <InvoiceInfoModule lng={lng} id={id} />;
};

export default InvoicePage;
