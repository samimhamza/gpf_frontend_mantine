import { AdminLayout } from "@/components/dashboard/AdminLayout";

const AdminPanelLayout = ({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: { lng: string };
}) => {
	return <AdminLayout lng={lng}>{children}</AdminLayout>;
};

export default AdminPanelLayout;
