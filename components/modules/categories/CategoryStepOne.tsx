"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, TextInput } from "@mantine/core";

interface CategoryStepOneProps {
	form: any;
	lng: string;
}

const CategoryStepOne = ({ form, lng }: CategoryStepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("name")}
					placeholder={t("name")}
					withAsterisk
					{...form.getInputProps("name")}
				/>
			</Flex>
		</>
	);
};

export default CategoryStepOne;
