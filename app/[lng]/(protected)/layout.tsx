// import Sidebar from "@/components/dashboard/sidebar";

const AdminPanelLayout = ({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: { lng: string };
}) => {
	return (
		<>
			{/* <Sidebar lng={lng}> */}
			{children}
			{/* </Sidebar> */}
		</>
	);
};

export default AdminPanelLayout;
