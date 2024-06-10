"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { HiMiniUsers } from "react-icons/hi2";
import { TeamsSchema } from "@/schemas/models/teams";
import StepOne from "./StepOne";
import useOffice from "@/customHooks/useOffice";

const TeamModal = ({
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
	const teamsSchema = TeamsSchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);
	const [employees, SetEmployees] = useState([]);

	const initialValues: any = {
		name: "",
		office_id: "",
		members: [],
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(teamsSchema),
		validateInputOnBlur: true,
	});

	const { offices, office } = useOffice(form);

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: "POST",
					url: "/teams",
					data: form.values,
			  })
			: await callApi({
					method: "PUT",
					url: `/teams/${editId}`,
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
					url: `/teams/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					form.setValues({
						name: response.data.name,
						office_id: response.data.office_id.toString(),
						members: response.data.members.map((item: any) =>
							item.id.toString()
						),
					});
					setLoading(false);
				}
			})();
		}
	}, [editId, callApi]);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
				url: "/all_employees",
			});
			if (status == 200 && response.result == true) {
				SetEmployees(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: `${item.first_name + " " + item.last_name}`,
							profile: item.profile,
						};
					})
				);
			}
		})();
	}, [callApi]);

	const steps = [
		{
			title: t("team_info"),
			icon: <HiMiniUsers size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>
					<StepOne
						offices={offices}
						employees={employees}
						form={form}
						lng={lng}
						office={office}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				let res = form.isValid();
				if (res) {
					let { response, status } = await callApi({
						method: "POST",
						url: "/teams/check_uniqueness",
						data: {
							name: form.values.name,
							office_id: form.values.office_id,
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

export default TeamModal;
