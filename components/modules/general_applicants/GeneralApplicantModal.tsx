'use client';

import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import { useAxios } from '@/customHooks/useAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, LoadingOverlay } from '@mantine/core';
import { FaPersonCircleCheck } from 'react-icons/fa6';
import { PiMapPinAreaBold } from 'react-icons/pi';
import { RxInfoCircled } from "react-icons/rx";


import { GeneralApplicantSchema } from '@/schemas/models/general_applicants';
import StepOne from './GeneralApplicantStepOne';
import useOffice from '@/customHooks/useOffice';
import GeneralApplicantStepTwo from './GeneralApplicantStepTwo';

const GeneralApplicantModal = ({
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
	const generalApplicantSchema = GeneralApplicantSchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);
	const [references, setReferences] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);

	const initialValues: any = {
		name: '',
		office_id: '',
		members: [],
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(generalApplicantSchema),
		validateInputOnBlur: true,
	});

	const { offices, office } = useOffice(form);

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: 'POST',
					url: '/general_applicants',
					data: form.values,
				})
			: await callApi({
					method: 'PUT',
					url: `/general_applicants/${editId}`,
					data: form.values,
				});
		if ((!editId ? status == 201 : status == 202) && response.result) {
			await setMutated(true);
			return true;
		}
		if (status == 422) {
			toast.error(t('editing_not_allowed'));
			close();
			return false;
		}
		toast.error(t('something_went_wrong'));
		return false;
	};


	useEffect(() => {
		console.log("YESHHHS");
		
		if (editId) {
			console.log("INSIDE ***(((((((");
			
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
								key != "office_id"
							)
								values[key] = value ? value : initialValues[key];
						}
						if (
							(key == "office_id" || key == "province_id") && value
						) {
							values[key] = value.toString();
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




	useEffect(() => {
		(async function () {
			console.log('methods called form referecnes....');
			
			const { response, status, error } = await callApi({				
				method: "GET",
				url: "/all_references",
				// url: "/office/auto_complete",
			});
			if (status == 200 && response.result == true) {
				setReferences(
					response.data.map((item: any) => {
						return {value: item.id.toString(), label: item.first_name + " " + item.last_name};
					})
				);
			}
		})();
	}, [callApi]);


	const steps = [
		{
			title: t('general_information'),
			icon: <RxInfoCircled size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<StepOne
						form={form}
						lng={lng}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				let res = form.isValid();
				// if (res) {
				// 	let { response, status } = await callApi({
				// 		method: 'POST',
				// 		url: '/general_applicants/check_uniqueness',
				// 		data: {
				// 			name: form.values.name,
				// 			office_id: form.values.office_id,
				// 			id: editId ? editId : null,
				// 		},
				// 	});
				// 	if (status == 226) {
				// 		form.setErrors({
				// 			name:
				// 				response.message == 0 &&
				// 				t('value_already_exists'),
				// 		});
				// 		return false;
				// 	} else if (status !== 200) return false;
				// 	return true;
				// }
				return res;
			},
		},
		{
			title: t('location'),
			icon: <PiMapPinAreaBold size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<GeneralApplicantStepTwo
						form={form}
						lng={lng}
						provinces={provinces}
						districts={districts}
						references={references}
						offices={offices}
						office={office}
						setDistricts={setDistricts}
					/>
				</Box>
			),
			async validate() {},
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
				width="60%"
			/>
		</form>
	);
};

export default GeneralApplicantModal;
