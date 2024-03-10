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
import { FcSurvey } from "react-icons/fc";

const AddPackageModal = ({
	opened,
	close,
	lng,
	setMutated,
	recordId,
}: {
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: any;
	recordId: number;
}) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const [schools, setSchools] = useState([]);
	const [loading, setLoading] = useState(false);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);

	const initialValues: any = {
		first_name: "",
		father_name: "",
		last_name: "",
		phone: "",
		staff_type: "",
		national_id: "",
		school_id: "",
		main_residence_id: "",
		current_residence_id: "",
		district_id: "",
		address: "",
		type: "",
		description: "",
		gender: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(teacherSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: "POST",
					url: "/teachers",
					data: form.values,
			  })
			: await callApi({
					method: "PUT",
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
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
				url: "/all_provinces",
			});
			if (status == 200 && response.result == true) {
				setProvinces(
					response.data.map((item: any) => {
						return { value: item.id.toString(), label: item.name_fa };
					})
				);
			}
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
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

	useEffect(() => {
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/teachers/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (
								key != "main_residence_id" &&
								key != "current_residence_id" &&
								key != "district_id"
							)
								values[key] = value ? value : initialValues[key];
						}
						if (
							(key == "main_residence_id" ||
								key == "current_residence_id" ||
								key == "district_id") &&
							value
						) {
							values[key] = value.toString();
						}
						if (key == "relevantable_id" && value) {
							values.school_id = value.toString();
						}
					});
					form.setValues(values);
					setLoading(false);
				}
			})();
		}
	}, [editId]);

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
					<TeacherStepOne
						form={form}
						lng={lng}
						schools={schools}
						provinces={provinces}
						setDistricts={setDistricts}
					/>
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
					form.isValid("national_id") &&
					form.isValid("gender") &&
					form.isValid("staff_type");
				if (res && form.values.national_id) {
					let { response, status } = await callApi({
						method: "POST",
						url: "/applicants/check_uniqueness",
						data: {
							national_id: form.values.national_id,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							national_id: response.message == 0 && t("value_already_exists"),
						});
						return false;
					} else if (status !== 200) return false;
					return true;
				}
				return res;
			},
		},
		{
			title: t("survey_info"),
			icon: <FcSurvey size={22} />,
			step: (
				<TeacherStepTwo
					form={form}
					lng={lng}
					provinces={provinces}
					districts={districts}
				/>
			),
			async validate() {
				form.validate();
				return form.isValid("type");
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
				lng={lng}
				title={title}
				editId={editId}
			/>
		</form>
	);
};

export default AddPackageModal;
