"use client";

import { useTranslation } from "@/app/i18n/client";
import Permissions from "@/components/Permissions";
import { Box, Checkbox, Flex, Paper, Text, TextInput } from "@mantine/core";

interface RoleStepOneProps {
	permissions: any;
	form: any;
	lng: string;
	totalPermissions: number;
}

interface permissionsProps {
	id: number;
	name: string;
	group_name: string;
}

const RoleStepOne = ({
	form,
	lng,
	permissions,
	totalPermissions,
}: RoleStepOneProps) => {
	const { t } = useTranslation(lng);
	const setAllPermissions = () => {
		const permissionIds: number[] = [];
		if (form.values.permissions?.length == totalPermissions) {
			form.setFieldValue("permissions", permissionIds);
			return;
		}
		Object.values(permissions)?.map((permissions: any) => {
			permissions.forEach((element: permissionsProps) => {
				permissionIds.push(element.id);
			});
		});
		form.setFieldValue("permissions", permissionIds);
	};

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
			<Box dir="ltr">
				<Paper m="sm" withBorder shadow="xs" radius="xs">
					<Box className="borderBottom" px="xs">
						<Flex
							px="xs"
							py="xs"
							// direction={{ rtl: "row-reverse", ltr: "row" }}
							direction="row"
							align="center"
							justify="space-between"
						>
							<Box>
								<Checkbox
									label={t("all")}
									checked={totalPermissions == form.values.permissions?.length}
									indeterminate={
										totalPermissions > form.values.permissions?.length &&
										form.values.permissions?.length != 0
									}
									onChange={setAllPermissions}
									className="label"
								/>
							</Box>
							<Text size="lg">{t("permissions")}</Text>
						</Flex>
					</Box>
					<Permissions form={form} permissions={permissions} />
				</Paper>
			</Box>
			<style jsx global>{`
				.borderBottom {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
				.label {
					margin-left: 0.5rem;
				}
			`}</style>
		</>
	);
};

export default RoleStepOne;
