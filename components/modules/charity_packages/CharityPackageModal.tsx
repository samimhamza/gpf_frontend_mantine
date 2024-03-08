"use client";

import CharityPackageStepOne from "@/components/modules/charity_packages/CharityPackageStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { CharityPackageSchema } from "@/schemas/models/charity_packages";
import { BiSolidBox } from "react-icons/bi";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const CharityPackageModal = ({
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
	const itemSchema = CharityPackageSchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);
	const [offices, setOffices] = useState([]);

	const initialValues: any = {
		name: "",
		office_id: "",
		period: "",
		start_date: null,
		end_date: "",
		cash_amount: "",
		currency: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(itemSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: "POST",
					url: "/charity_packages",
					data: form.values,
			  })
			: await callApi({
					method: "PUT",
					url: `/charity_packages/${editId}`,
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
				url: "/all_offices",
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
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/charity_packages/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							values[key] = value ? value : initialValues[key];
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
			title: t("item_info"),
			icon: <BiSolidBox size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<CharityPackageStepOne form={form} lng={lng} offices={offices} />
				</Box>
			),
			async validate() {
				form.validate();
				let res = form.isValid("name") && form.isValid("unit");

				if (res) {
					let { response, status } = await callApi({
						method: "POST",
						url: "/charity_packages/check_uniqueness",
						data: {
							name: form.values.name,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							name: response.message == 0 && t("name_already_exists"),
						});
						return false;
					} else if (status !== 200) return false;
					return true;
				}
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
				lng={lng}
				title={title}
				editId={editId}
			/>
		</form>
	);
};

export default CharityPackageModal;
