"use client";

import { useTranslation } from "@/app/i18n/client";
import { Box, Checkbox, Flex, Paper, Text } from "@mantine/core";
import React from "react";
import Permissions from "../Permissions.tsx";
import classes from "./StepTwo.module.css";

interface StepTwoProps {
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

const StepTwo = ({
	permissions,
	form,
	lng,
	totalPermissions,
}: StepTwoProps) => {
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
			<Box dir="ltr">
				{/* <Stack p={{ xs: 5, md: 8 }}>
				<Stack direction={{ xs: "column", md: "row" }} spacing={5}>
					<AppAutocompleteField
						multiple
						placeholder={messages["common.rolePlaceholder"]}
						label={<IntlMessages id="common.role" />}
						name="roles"
						variant="outlined"
						size="small"
						sx={{ flex: 1, width: "100%" }}
						dataLoading={rolesLoading}
						options={roles.map((item) => {
							item.name = item.name.replaceAll("_", " ");
							item.name = item.name.replace(/^(.)|\s+(.)/g, (c) =>
								c.toUpperCase()
							);
							return item;
						})}
						keyName="name"
						value={values?.roles}
						handleChange={({ name, value }) => setfieldvalue(name, value)}
					/>
				</Stack>
			</Stack> */}
				<Paper m="sm" withBorder shadow="xs" p="xs" radius="xs">
					<Flex
						mx={5}
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
				</Paper>
				<Permissions form={form} permissions={permissions} />
			</Box>
		</>
	);
};

export default StepTwo;
