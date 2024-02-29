"use client";

import { Checkbox, Flex, Paper, Stack } from "@mantine/core";
import classes from "./Permissions.module.css";

interface PermissionsProps {
	form: any;
	permissions: Array<any>;
}
interface permissionProps {
	id: number;
	name: string;
	group_name: string;
}

const Permissions = ({ form, permissions }: PermissionsProps) => {
	const setCategoryPermissions = (permissions: Array<permissionProps>) => {
		const ids = permissions.map((item: permissionProps) => item.id);
		if (ids.every((item) => form.values.permissions?.includes(item))) {
			const permissionsIds = form.values.permissions;
			form.setFieldValue(
				"permissions",
				permissionsIds.filter((item: any) => !ids.includes(item))
			);
			return;
		}
		if (ids.some((item) => form.values.permissions?.includes(item))) {
			form.setFieldValue("permissions", [...ids, ...form.values.permissions]);
			return;
		}
		const prePermissions = form.values?.permissions
			? form.values.permissions
			: [];
		form.setFieldValue("permissions", [...ids, ...prePermissions]);
	};

	const handleChange = (e: any) => {
		if (form.values?.permissions) {
			if (form.values?.permissions.includes(parseInt(e.target.value))) {
				let permissions = form.values?.permissions;
				form.setFieldValue(
					"permissions",
					permissions.filter((item: any) => item != e.target.value)
				);
				return;
			}
			form.setFieldValue("permissions", [
				parseInt(e.target.value),
				...form.values.permissions,
			]);
			return;
		}
		form.setFieldValue("permissions", [parseInt(e.target.value)]);
	};

	return (
		<Paper shadow="xs" radius="xs" withBorder m="xs" p="xs">
			<Flex direction="column" wrap="wrap">
				{Object.entries(permissions)?.map(([name, pers], index) => (
					<Stack style={{ flex: "50%" }} key={index}>
						<Flex direction="row">
							<Checkbox
								classNames={{ label: classes.label }}
								label={name
									.replaceAll("_", " ")
									.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
								checked={
									form.values?.permissions
										? pers
												.map((item: permissionProps) => item.id)
												.every((item: number) =>
													form.values.permissions?.includes(item)
												)
										: false
								}
								indeterminate={
									form.values?.permissions
										? !pers
												.map((item: permissionProps) => item.id)
												.every((item: number) =>
													form.values.permissions?.includes(item)
												)
											? pers
													.map((item: permissionProps) => item.id)
													.some((item: number) =>
														form.values.permissions?.includes(item)
													)
											: false
										: false
								}
								onChange={() => setCategoryPermissions(pers)}
							/>
						</Flex>
						<Paper withBorder radius="xs" p="xs" mx="xs" mb="xs">
							<Flex
								direction={{ xs: "column", md: "row" }}
								wrap="wrap"
								gap="xs"
							>
								{pers.map((permission: permissionProps) => (
									<Checkbox
										classNames={{ label: classes.label }}
										size="xs"
										key={permission.id}
										{...form.getInputProps("permissions")}
										name="permissions"
										value={permission.id}
										checked={
											form.values?.permissions?.includes(permission.id)
												? true
												: false
										}
										onChange={handleChange}
										style={{
											flex: "1 0 21%",
											// width: { xs: "auto", md: "24%" },
										}}
										label={permission.name
											.replaceAll("_", " ")
											.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
									/>
								))}
							</Flex>
						</Paper>
					</Stack>
				))}
			</Flex>
		</Paper>
	);
};

export default Permissions;
