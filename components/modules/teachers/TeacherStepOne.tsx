"use client";

import { useTranslation } from "@/app/i18n/client";
import Profile from "@/components/Profile";
import { Center, Flex, TextInput } from "@mantine/core";

interface TeacherStepOneProps {
	form: any;
	lng: string;
	profileUrl: any;
}

const TeacherStepOne = ({ form, lng, profileUrl }: TeacherStepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Center p="sm">
				<Profile
					lng={lng}
					profileUrl={profileUrl}
					name="profile"
					form={form}
					title={t("profile")}
				/>
			</Center>
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
					{...form.getInputProps("father_name")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("phone")}
					placeholder={t("phone")}
					{...form.getInputProps("phone")}
				/>
			</Flex>
		</>
	);
};

export default TeacherStepOne;
