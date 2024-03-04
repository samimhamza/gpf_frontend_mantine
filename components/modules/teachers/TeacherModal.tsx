"use client";

import TeacherStepOne from "@/components/modules/teachers/TeacherStepOne";
import TeacherStepTwo from "@/components/modules/teachers/TeacherStepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { TeacherSchema } from "@/schemas/models/teachers";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const TeacherModal = ({
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
	const teacherSchema = TeacherSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const callPutApi = useAxios({ method: "PUT" });
	const [schools, setSchools] = useState([]);
	const [loading, setLoading] = useState(false);

	const initialValues: any = {
		first_name: "",
		father_name: "",
		last_name: "",
		phone: "",
		type: "",
		staff_type: "",
		national_id: "",
		school_id: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(teacherSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callPostApi({
					url: "/teachers",
					data: form.values,
			  })
			: await callPutApi({
					url: `/teachers/${editId}`,
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
					url: `/teachers/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					values.permissions = [];
					values.roles = [];
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (key != "permissions" && key != "roles" && key != "office_id")
								values[key] = value ? value : initialValues[key];
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
				url: "/all_schools",
			});
			if (status == 200 && response.result == true) {
				const schools: any = Object.entries(response.data).map(
					([name, items]: any) => {
						const schools = items.map((item: any) => {
							return { value: item.id.toString(), label: item.name };
						});
						return { group: name, items: schools };
					}
				);
				setSchools(schools);
			}
		})();
	}, []);

	const steps = [
		{
			title: t("teacher_info"),
			icon: <FaChalkboardTeacher size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<TeacherStepOne form={form} lng={lng} schools={schools} />
				</Box>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("first_name") &&
					form.isValid("last_name") &&
					form.isValid("father_name") &&
					form.isValid("phone") &&
					form.isValid("school_id") &&
					form.isValid("type") &&
					form.isValid("staff_type");
				if (res) {
					let { response, status } = await callPostApi({
						url: "/teacher/valid_credential",
						data: {
							national_id: form.values.national_id,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							national_id:
								response.message == 0 && t("national_id_already_exists"),
						});
						return false;
					} else if (status !== 200) return false;
					return true;
				}
				return false;
			},
		},
		// {
		// 	title: t("authorizations"),
		// 	icon: <TbShieldCheck size={22} />,
		// 	step: <TeacherStepTwo form={form} lng={lng} />,
		// 	async validate() {
		// 		return true;
		// 	},
		// },
	];
	return (
		<form>
			<CustomModal
				opened={opened}
				close={close}
				steps={steps}
				form={form}
				submit={submit}
				lng={lng}
				title={title}
				editId={editId}
			/>
		</form>
	);
};

export default TeacherModal;
