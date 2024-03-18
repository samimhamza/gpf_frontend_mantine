"use client";

import { useTranslation } from "@/app/i18n/client";
import { Flex, TextInput } from "@mantine/core";

interface OfficeStepOneProps {
	form: any;
	lng: string;
}

const OfficeStepOne = ({ form, lng }: OfficeStepOneProps) => {
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
					label={t("code")}
					placeholder={t("code")}
					withAsterisk
					{...form.getInputProps("code")}
				/>
			</Flex>
		</>
	);
};

export default OfficeStepOne;
