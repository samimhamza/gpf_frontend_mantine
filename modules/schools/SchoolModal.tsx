"use client";

import SchoolStepOne from "@/components/schools/SchoolStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { SchoolSchema } from "@/schemas/models/schools";
import { FaSchool } from "react-icons/fa";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import SchoolStepTwo from "@/components/schools/SchoolStepTwo";
import { FaLocationDot } from "react-icons/fa6";

const SchoolModal = ({
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
	const schoolSchema = SchoolSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const callPutApi = useAxios({ method: "PUT" });
	const [offices, setOffices] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [loading, setLoading] = useState(false);

	const initialValues: any = {
		name: "",
		total_staff: "",
		office_id: "",
		type: "",
		status: "",
		head_name: "",
		head_phone: "",
		province_id: "",
		district_id: "",
		address: "",
		village: "",
		street: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(schoolSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callPostApi({
					url: "/schools",
					data: form.values,
			  })
			: await callPutApi({
					url: `/schools/${editId}`,
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
					url: `/schools/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (
								key != "province_id" &&
								key != "district_id" &&
								key != "office_id"
							)
								values[key] = value ? value : initialValues[key];
						}
						if (key == "office_id" && value) {
							values[key] = value.toString();
						}
						if (key == "province_id" && value) {
							values[key] = value.toString();
						}
						if (key == "district_id" && value) {
							values[key] = value.toString();
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

	const steps = [
		{
			title: t("school_info"),
			icon: <FaSchool size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<SchoolStepOne form={form} lng={lng} offices={offices} />
				</Box>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("name") &&
					form.isValid("office_id") &&
					form.isValid("total_staff") &&
					form.isValid("head_name") &&
					form.isValid("type");
				return res;
			},
		},
		{
			title: t("school_location"),
			icon: <FaLocationDot size={22} />,
			step: <SchoolStepTwo provinces={provinces} form={form} lng={lng} />,
			async validate() {
				form.validate();
				let res = form.isValid("province_id") && form.isValid("district_id");
				return res;
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

export default SchoolModal;
