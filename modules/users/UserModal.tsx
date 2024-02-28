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
import toast from "react-hot-toast";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect } from "react";

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

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				url: "/office/auto_complete",
			});
			if (status == 200) {
				toast.success(JSON.stringify(response));
			} else {
				toast.error(JSON.stringify(error.message));
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
			step: <StepOne form={form} lng={lng} />,
			async validate() {
				let response = await getApi("/user/valid_credential", {
					email: form.values.email,
					username: form.values.username,
				});
				if (response.status === 226) {
					form.setErrors({
						email: response.data == 1 ? `Email Already Exists` : "",
						username: response.data == 2 ? `Username Already Exists` : "",
					});
					return false;
				} else if (response.status !== 200) {
					return false;
				}
				form.validate();
				let res =
					form.isValid("full_name") &&
					form.isValid("office_id") &&
					form.isValid("email") &&
					form.isValid("username") &&
					form.isValid("password") &&
					form.isValid("confirm_password");
				return res;
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
