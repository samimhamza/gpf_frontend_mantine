"use client";

import StepOne from "@/components/users/StepOne";
import StepTwo from "@/components/users/StepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { UserSchema } from "@/schemas/models/users";
import { TbUserCircle } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserModal = ({
	opened,
	close,
	lng,
	setMutated,
}: {
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: any;
}) => {
	const { t } = useTranslation(lng);
	const userSchema = UserSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const [offices, setOffices] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [totalPermissions, setTotalPermissions] = useState<number>(0);

	const submit = async () => {
		const { response, error, status } = await callPostApi({
			url: "/users",
			data: form.values,
		});
		if (status == 201 && response.result) {
			await setMutated(true);
			return true;
		}
		toast.error(t("something_went_wrong"));
		return false;
	};

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				url: "/office/auto_complete",
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
				url: "/grouped_permissions",
			});
			if (status == 200 && response.result == true) {
				setPermissions(response.data);
				setTotalPermissions(response.total);
			}
		})();
	}, []);

	const form = useForm({
		initialValues: {
			full_name: "",
			email: "",
			username: "",
			office_id: "",
			password: "",
			confirm_password: "",
			roles: [],
			permissions: [],
		},
		validate: zodResolver(userSchema),
		validateInputOnBlur: true,
	});

	const steps = [
		{
			title: t("user_info"),
			icon: <TbUserCircle size={22} />,
			step: (
				<StepOne
					form={form}
					lng={lng}
					offices={offices}
					setOffices={setOffices}
				/>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("full_name") &&
					form.isValid("office_id") &&
					form.isValid("email") &&
					form.isValid("username") &&
					form.isValid("password") &&
					form.isValid("confirm_password");
				if (res) {
					let { response, status } = await callPostApi({
						url: "/user/valid_credential",
						data: {
							email: form.values.email,
							username: form.values.username,
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
			/>
		</form>
	);
};

export default UserModal;
