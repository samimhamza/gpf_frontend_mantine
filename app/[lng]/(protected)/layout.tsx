import { authOptions } from "@/auth";
import { AdminLayout } from "@/components/Dashboard/AdminLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPanelLayout = async ({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) => {
  const data = await getServerSession(authOptions);
  if (!data?.user) {
    redirect("auth/login");
  }
  return <AdminLayout lng={lng}>{children}</AdminLayout>;
};

export default AdminPanelLayout;
