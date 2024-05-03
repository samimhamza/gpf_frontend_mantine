"use client";

import SchoolStepOne from "@/components/modules/schools/SchoolStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { SchoolSchema } from "@/schemas/models/schools";
import { FaSchool } from "react-icons/fa";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import SchoolStepTwo from "@/components/modules/schools/SchoolStepTwo";
import { FaLocationDot } from "react-icons/fa6";
import useOffice from "@/customHooks/useOffice";

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
	const callApi = useAxios();
	const [provinces, setProvinces] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editDistrict, setEditDistrict] = useState("");

	const initialValues: any = useMemo(() => {
		return {
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
		};
	}, []);

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(schoolSchema),
		validateInputOnBlur: true,
	});

	const { offices, office } = useOffice(form);

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: "POST",
					url: "/schools",
					data: form.values,
			  })
			: await callApi({
					method: "PUT",
					url: `/schools/${editId}`,
					data: form.values,
			  });
		if ((!editId ? status == 201 : status == 202) && response.result) {
			await setMutated(true);
			return true;
		}
		if (status == 422) {
			toast.error(t("editing_not_allowed"));
			close();
			return false;
		}
		toast.error(t("something_went_wrong"));
		return false;
	};

	useEffect(() => {
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/schools/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (
								key != "province_id" &&
								key != "district_id" &&
								key != "total_staff" &&
								key != "office_id"
							)
								values[key] = value ? value : initialValues[key];
						}
						if (
							(key == "office_id" ||
								key == "province_id" ||
								key == "total_staff") &&
							value
						) {
							values[key] = value.toString();
						}
						if (key == "district_id" && value) {
							setEditDistrict(value.toString());
						}
					});
					form.setValues(values);
					setLoading(false);
				}
			})();
		}
	}, [editId, callApi, initialValues]);

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
	}, [callApi]);

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
					<SchoolStepOne
						form={form}
						lng={lng}
						offices={offices}
						office={office}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("name") &&
					form.isValid("office_id") &&
					form.isValid("total_staff") &&
					form.isValid("head_name") &&
					form.isValid("head_phone") &&
					form.isValid("type");
				return res;
			},
		},
		{
			title: t("school_location"),
			icon: <FaLocationDot size={22} />,
			step: (
				<SchoolStepTwo
					provinces={provinces}
					form={form}
					lng={lng}
					editDistrict={editDistrict}
					setEditDistrict={setEditDistrict}
				/>
			),
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
				title={title}
				editId={editId}
				lng={lng}
			/>
		</form>
	);
};

export default SchoolModal;
