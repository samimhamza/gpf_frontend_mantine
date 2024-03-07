"use client";

import { useTranslation } from "@/app/i18n/client";
import {
	Box,
	Checkbox,
	Flex,
	MultiSelect,
	Paper,
	Stack,
	Text,
} from "@mantine/core";
import React from "react";
import classes from "./UserStepTwo.module.css";
import Permissions from "@/components/Permissions";

interface UserStepTwoProps {
	roles: Array<{ value: number; label: string }>;
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

const UserStepTwo = ({
	roles,
	permissions,
	form,
	lng,
	totalPermissions,
}: UserStepTwoProps) => {
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
			<Stack p="sm">
				<MultiSelect
					label={t("roles")}
					placeholder={t("roles")}
					withAsterisk
					data={roles}
					searchable
					clearable
					nothingFoundMessage={t("noting_found")}
					{...form.getInputProps("roles")}
				/>
			</Stack>
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
									classNames={{ label: classes.label }}
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
			`}</style>
		</>
	);
};

export default UserStepTwo;
