"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, TextInput } from "@mantine/core";

interface ItemStepOneProps {
	form: any;
	lng: string;
}

const ItemStepOne = ({ form, lng }: ItemStepOneProps) => {
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
				<TextInput
					style={{ flex: 1 }}
					label={t("unit")}
					placeholder={t("unit")}
					withAsterisk
					{...form.getInputProps("unit")}
				/>
			</Flex>
		</>
	);
};

export default ItemStepOne;
