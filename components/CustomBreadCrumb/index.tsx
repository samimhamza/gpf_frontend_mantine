import { Box, Breadcrumbs, Button, Flex, Paper, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

interface ItemProps {
	title: string;
	link?: string;
}
const CustomBreadCrumb = ({
	items,
	showButton,
	buttonTitle,
	onButtonClick,
}: {
	items: Array<ItemProps>;
	showButton?: boolean;
	buttonTitle?: string;
	onButtonClick?: () => void;
}) => {
	const router = useRouter();
	const breadCrumbsItems = items.map((item, index) => (
		<Box key={index} style={item?.link ? { cursor: "pointer" } : {}}>
			<Text
				key={index}
				c={item?.link ? "primary" : ""}
				onClick={() => item?.link && router.push(item.link)}
			>
				{item.title}
			</Text>
		</Box>
	));

	return (
		<Paper p="xs" withBorder shadow="sm" mb="xs">
			<Flex justify="space-between">
				<Breadcrumbs>{breadCrumbsItems}</Breadcrumbs>
				{showButton && (
					<Button onClick={onButtonClick} color="green">
						{buttonTitle}
					</Button>
				)}
			</Flex>
		</Paper>
	);
};

export default CustomBreadCrumb;
