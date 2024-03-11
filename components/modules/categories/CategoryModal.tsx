"use client";

import CategoryStepOne from "@/components/modules/categories/CategoryStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { CategorySchema } from "@/schemas/models/categories";
import { BiSolidBox } from "react-icons/bi";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";

const CategoryModal = ({
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
	const categorySchema = CategorySchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);

	const initialValues: any = {
		name: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(categorySchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: "POST",
					url: "/categories",
					data: form.values,
			  })
			: await callApi({
					method: "PUT",
					url: `/categories/${editId}`,
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
					method: "GET",
					url: `/categories/${editId}`,
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
			title: t("category_info"),
			icon: <BiSolidBox size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<CategoryStepOne form={form} lng={lng} />
				</Box>
			),
			async validate() {
				form.validate();
				let res = form.isValid("name");

				if (res) {
					let { response, status } = await callApi({
						method: "POST",
						url: "/categories/check_uniqueness",
						data: {
							name: form.values.name,
							id: editId ? editId : null,
						},
					});
					if (status == 226) {
						form.setErrors({
							name: response.message == 0 && t("value_already_exists"),
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
				width="40%"
			/>
		</form>
	);
};

export default CategoryModal;
