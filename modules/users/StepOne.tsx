import { useTranslation } from "@/app/i18n/client";
import {
	Autocomplete,
	Flex,
	Group,
	PasswordInput,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const StepOne = ({ form, lng }: { form: any; lng: string }) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

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
					label={t("full_name")}
					placeholder={t("full_name")}
					withAsterisk
					{...form.getInputProps("email_or_username")}
				/>
				<Autocomplete
					style={{ flex: 1 }}
					label={t("email")}
					placeholder={t("enter_email")}
					withAsterisk
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "center" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("full_name")}
					placeholder={t("full_name")}
					withAsterisk
					{...form.getInputProps("email_or_username")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("email")}
					placeholder={t("enter_email")}
					withAsterisk
				/>
			</Flex>
		</>
	);
};

export default StepOne;
