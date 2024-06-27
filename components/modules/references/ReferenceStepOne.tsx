"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Flex, Select, TextInput } from "@mantine/core";

interface ReferenceStepOneProps {
	form: any;
	lng: string;
	offices: Array<{ value: string; label: string }>;
	office: string | null;
	users: Array<{ value: string; label: string }>;
}

const ReferenceStepOne = ({
	form,
	lng,
	office,
	offices,
	users,
}: ReferenceStepOneProps) => {
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
					label={t("first_name")}
					placeholder={t("first_name")}
					withAsterisk
					{...form.getInputProps("first_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("last_name")}
					placeholder={t("last_name")}
					withAsterisk
					{...form.getInputProps("last_name")}
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
					label={t("father_name")}
					placeholder={t("father_name")}
					withAsterisk
					{...form.getInputProps("father_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("job_location")}
					placeholder={t("job_location")}
					withAsterisk
					{...form.getInputProps("job_location")}
				/>
			</Flex>
			<Flex
				direction={{ base: "column", sm: "row" }}
				gap="sm"
				p="sm"
				justify={{ sm: "left" }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t("position")}
					placeholder={t("position")}
					withAsterisk
					{...form.getInputProps("position")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("user")}
					placeholder={t("user")}
					withAsterisk
					data={users}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("user_id")}
				/>
			</Flex>
			{office == "all" && (
				<Flex
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					p="sm"
					justify={{ sm: "center" }}
				>
					<Select
						style={{ flex: 1 }}
						label={t("office")}
						placeholder={t("office")}
						withAsterisk
						data={offices}
						searchable
						clearable
						nothingFoundMessage={t("noting_found")}
						{...form.getInputProps("office_id")}
					/>
					<Box style={{ flex: 1 }}></Box>
				</Flex>
			)}
		</>
	);
};

export default ReferenceStepOne;
