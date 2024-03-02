"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Flex, Loader, PasswordInput, Select, TextInput } from "@mantine/core";
import { useState } from "react";

interface UserStepOneProps {
	form: any;
	lng: string;
	offices: any;
	setOffices: any;
	editId: number | undefined;
}

const UserStepOne = ({
	form,
	lng,
	offices,
	setOffices,
	editId,
}: UserStepOneProps) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios({ method: "GET" });
	const [loading, setLoading] = useState(false);

	// const handleSearch = async (value: string) => {
	// 	setLoading(true);
	// 	const { response, status, error } = await callApi({
	// 		url: `/office/auto_complete?name=${value}`,
	// 	});
	// 	if (status == 200 && response.result == true) {
	// 		setOffices(
	// 			response.data.map((item: any) => {
	// 				return { value: item.id.toString(), label: item.name };
	// 			})
	// 		);
	// 	}
	// 	setLoading(false);
	// };
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
					{...form.getInputProps("full_name")}
				/>
				<Select
					style={{ flex: 1 }}
					label={t("office")}
					placeholder={t("office")}
					withAsterisk
					data={offices}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					// onSearchChange={handleSearch}
					// rightSection={loading && <Loader color="blue" size={15} />}
					{...form.getInputProps("office_id")}
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
					label={t("email")}
					placeholder={t("email")}
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t("username")}
					placeholder={t("username")}
					withAsterisk
					{...form.getInputProps("username")}
				/>
			</Flex>
			{!editId && (
				<Flex
					direction={{ base: "column", sm: "row" }}
					gap="sm"
					p="sm"
					justify={{ sm: "center" }}
				>
					<PasswordInput
						style={{ flex: 1 }}
						label={t("password")}
						placeholder={t("password")}
						withAsterisk
						{...form.getInputProps("password")}
					/>
					<PasswordInput
						style={{ flex: 1 }}
						label={t("confirm_password")}
						placeholder={t("confirm_password")}
						withAsterisk
						{...form.getInputProps("confirm_password")}
					/>
				</Flex>
			)}
		</>
	);
};

export default UserStepOne;
