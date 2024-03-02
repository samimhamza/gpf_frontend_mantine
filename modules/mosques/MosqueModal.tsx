"use client";

import MosqueStepOne from "@/components/mosques/MosqueStepOne";
// import StepTwo from "@/components/mosques/StepTwo";
import { useForm, zodResolver } from "@mantine/form";
import { MosqueSchema } from "@/schemas/models/mosques";
import { FaMosque } from "react-icons/fa";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const MosqueModal = ({
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
	const mosqueSchema = MosqueSchema(t);
	const callApi = useAxios({ method: "GET" });
	const callPostApi = useAxios({ method: "POST" });
	const callPutApi = useAxios({ method: "PUT" });
	const [offices, setOffices] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [loading, setLoading] = useState(false);

	const initialValues: any = {
		name: "",
		office_id: "",
		province_id: "",
		district_id: "",
		mosque_type: "",
		mosque_formal: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(mosqueSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callPostApi({
					url: "/mosques",
					data: form.values,
			  })
			: await callPutApi({
					url: `/mosques/${editId}`,
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
					url: `/mosques/${editId}`,
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
				// url: "/office/auto_complete",
			});
			if (status == 200 && response.result == true) {
				setProvinces(
					response.data.map((item: any) => {
						return { value: item.name, label: item.name };
					})
				);
			}
		})();
	}, []);

	const steps = [
		{
			title: t("mosque_info"),
			icon: <FaMosque size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<MosqueStepOne
						form={form}
						lng={lng}
						offices={offices}
						provinces={provinces}
						districts={districts}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				let res =
					form.isValid("name") &&
					form.isValid("office_id") &&
					form.isValid("province_id") &&
					form.isValid("district_id");
				if (res) {
					let { response, status } = await callPostApi({
						url: "/mosque/valid_credential",
						data: {
							name: form.values.name,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							name:
								(response.message == 1 || response.message == 0) &&
								t("mosque_name_already_exists"),
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
		// 	step: (
		// 		<StepTwo
		// 		// roles={roles}
		// 		// permissions={permissions}
		// 		// form={form}
		// 		// lng={lng}
		// 		// totalPermissions={totalPermissions}
		// 		/>
		// 	),
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
				doneTitle={t("done")}
				title={title}
			/>
		</form>
	);
};

export default MosqueModal;
