"use client";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { UserSchema } from "@/schemas/pages/users";
import { TbUserCircle } from "react-icons/tb";
import { TbShieldCheck } from "react-icons/tb";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";

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
			title: "General Info",
			icon: <TbUserCircle size={22} />,
			step: StepOne,
			async validate() {
				// form.validate();
				// let res =
				// 	form.isValid("firstname") &&
				// 	form.isValid("lastname") &&
				// 	form.isValid("birth_date") &&
				// 	form.isValid("job_title") &&
				// 	form.isValid("phone") &&
				// 	form.isValid("whatsapp") &&
				// 	form.isValid("gender");
				return true;
			},
		},
		{
			title: "Credentials",
			icon: <TbShieldCheck size={22} />,
			step: StepTwo,
			async validate() {
				// let emailExist = await exists("email", form.values.email);
				// let usernameExist = await exists("username", form.values.username);
				// if (emailExist || usernameExist) {
				// 	form.setErrors({
				// 		email: emailExist ? `Email Already Exists` : "",
				// 		username: usernameExist ? `Username Already Exists` : "",
				// 	});
				// 	return false;
				// }
				// form.validate();
				// let res =
				// 	!emailExist &&
				// 	!usernameExist &&
				// 	form.isValid("email") &&
				// 	form.isValid("username") &&
				// 	form.isValid("password") &&
				// 	form.isValid("confirm_password") &&
				// 	form.isValid("roles");
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
			/>
		</form>
	);
};

export default UserModal;
