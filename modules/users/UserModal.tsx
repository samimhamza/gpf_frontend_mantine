"use client";

import StepOne from "@/components/users/StepOne";
import StepTwo from "@/components/users/StepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { EditUserSchema, CreateUserSchema } from "@/schemas/models/users";
import { TbUserCircle } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const UserModal = ({
	opened,
	close,
	lng,
	setMutated,
	title,
	editId,
}: {
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: any;
	title: string;
	editId: number | undefined;
}) => {
	const { t } = useTranslation(lng);
	const createUserSchema = CreateUserSchema(t);
	const editUserSchema = EditUserSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const callPutApi = useAxios({ method: "PUT" });
	const [offices, setOffices] = useState([]);
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPermissions, setTotalPermissions] = useState<number>(0);

	const createInitialValues = {
		full_name: "",
		email: "",
		username: "",
		office_id: "",
		password: "",
		confirm_password: "",
		roles: [],
		permissions: [],
	};
	const editInitialValues: any = {
		full_name: "",
		email: "",
		username: "",
		office_id: "",
		roles: [],
		permissions: [],
	};

	const form = useForm({
		initialValues: !editId ? createInitialValues : editInitialValues,
		validate: zodResolver(!editId ? createUserSchema : editUserSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callPostApi({
					url: "/users",
					data: form.values,
			  })
			: await callPutApi({
					url: `/users/${editId}`,
					data: form.values,
			  });
		if ((!editId ? status == 201 : status == 202) && response.result) {
			await setMutated(true);
			return true;
		}
		toast.error(t("something_went_wrong"));
		return false;
	};

	useEffect(() => {
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					url: `/users/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					values.permissions = [];
					values.roles = [];
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(editInitialValues).includes(key)) {
							if (key != "permissions" && key != "roles" && key != "office_id")
								values[key] = value ? value : editInitialValues[key];
						}
						if (key == "office_id" && value) {
							values[key] = value.toString();
						}
						if (Array.isArray(value) && value.length) {
							if (key == "permissions") {
								value.forEach((item: any) => {
									values.permissions.push(item.id);
								});
							}
							if (key == "roles") {
								value.forEach((item: any) => {
									values.roles.push(item.name);
								});
							}
						}
					});
					form.setValues(values);
					setLoading(false);
				}
			})();
		}
	}, [editId]);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				url: "/all_offices",
				// url: "/office/auto_complete",
			});
			if (status == 200 && response.result == true) {
				setOffices(
					response.data.map((item: any) => {
						return { value: item.id.toString(), label: item.name };
					})
				);
			}
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				url: "/all_roles",
				// url: "/office/auto_complete",
			});
			if (status == 200 && response.result == true) {
				setRoles(
					response.data.map((item: any) => {
						return { value: item.name, label: item.name };
					})
				);
			}
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				url: "/grouped_permissions",
			});
			if (status == 200 && response.result == true) {
				setPermissions(response.data);
				setTotalPermissions(response.total);
			}
		})();
	}, []);

	const steps = [
		{
			title: t("user_info"),
			icon: <TbUserCircle size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<StepOne
						form={form}
						lng={lng}
						offices={offices}
						setOffices={setOffices}
						editId={editId}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("full_name") &&
					form.isValid("office_id") &&
					form.isValid("email") &&
					form.isValid("username") &&
					!editId
						? form.isValid("password") && form.isValid("confirm_password")
						: true;
				if (res) {
					let { response, status } = await callPostApi({
						url: "/user/valid_credential",
						data: {
							email: form.values.email,
							username: form.values.username,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							email:
								(response.message == 1 || response.message == 0) &&
								t("email_already_exists"),
							username:
								(response.message == 2 || response.message == 0) &&
								t("username_already_exists"),
						});
						return false;
					} else if (status !== 200) {
						return false;
					} else {
						return true;
					}
				}
			},
		},
		{
			title: t("authorizations"),
			icon: <TbShieldCheck size={22} />,
			step: (
				<StepTwo
					roles={roles}
					permissions={permissions}
					form={form}
					lng={lng}
					totalPermissions={totalPermissions}
				/>
			),
			async validate() {
				return true;
			},
		},
	];
	return (
		<form>
			<CustomModal
				opened={opened}
				close={close}
				steps={steps}
				form={form}
				submit={submit}
				doneTitle={t("done")}
				title={title}
			/>
		</form>
	);
};

export default UserModal;
