import { Breadcrumbs, Paper, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

interface ItemProps {
	title: string;
	link?: string;
}
const CustomBreadCrumb = ({ items }: { items: Array<ItemProps> }) => {
	const router = useRouter();
	const breadCrumbsItems = items.map((item, index) => (
		<Text
			key={index}
			c={item?.link ? "blue" : ""}
			style={item?.link ? { cursor: "pointer" } : {}}
			onClick={() => item?.link && router.push(item.link)}
		>
			{item.title}
		</Text>
	));

	return (
		<Paper p="xs" withBorder shadow="sm" mb="xs">
			<Breadcrumbs>{breadCrumbsItems}</Breadcrumbs>
		</Paper>
	);
};

export default CustomBreadCrumb;
