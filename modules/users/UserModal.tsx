"use client";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { UserSchema } from "@/schemas/models/users";
import { TbUserCircle } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { getApi } from "@/axios";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserModal = ({
	opened,
	close,
	lng,
}: {
	opened: boolean;
	close: () => void;
	lng: string;
}) => {
	const { t } = useTranslation(lng);
	const submit = async () => {};
	const userSchema = UserSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const [offices, setOffices] = useState([]);

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
			} else {
				console.error(error.message);
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
			roles: "",
			permissions: "",
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
			step: <StepTwo />,
		},
	];
	return (
		<CustomModal
			opened={opened}
			close={close}
			steps={steps}
			form={form}
			submit={submit}
			doneTitle={t("done")}
		/>
	);
};

export default UserModal;
