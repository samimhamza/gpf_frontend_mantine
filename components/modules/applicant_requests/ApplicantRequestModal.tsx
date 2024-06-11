'use client';

import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import { useAxios } from '@/customHooks/useAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, LoadingOverlay } from '@mantine/core';
import { PiMapPinAreaBold } from 'react-icons/pi';
import { RxInfoCircled } from 'react-icons/rx';

import { GeneralApplicantSchema } from '@/schemas/models/general_applicants';
// import GeneralApplicantStepOne from './GeneralApplicantStepOne';
import useOffice from '@/customHooks/useOffice';
// import GeneralApplicantStepTwo from './GeneralApplicantStepTwo';

const ApplicantRequestModal = ({
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
	const [editDistrict, setEditDistrict] = useState('');

	const initialValues: any = {
		name: '',
		agent_name: '',
		agent_phone: '',
		descriptions: '',
		address: '',
		applicant_type: '',
		office_id: '',
		referenced_by: '',
		province_id: '',
		district_id: '',
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(generalApplicantSchema),
		validateInputOnBlur: true,
	});

	const { offices, office } = useOffice(form);

	const submit = async () => {
		const { response, status, error } = !editId
			? await callApi({
					method: 'POST',
					url: '/general_applicant_requests',
					data: form.values,
				})
			: await callApi({
					method: 'PUT',
					url: `/general_applicant_requests/${editId}`,
					data: form.values,
				});
		if ((!editId ? status == 201 : status == 202) && response.result) {
			await setMutated(true);
			return true;
		}
		if (status == 422) {
			toast.error(t('editing_not_allowed'));
			// close();
			return false;
		}
		toast.error(t('something_went_wrong'));
		return false;
	};

	useEffect(() => {
		if (editId) {
			(async function () {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: 'GET',
					url: `/schools/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (
								key != 'province_id' &&
								key != 'district_id' &&
								key != 'office_id'
							)
								values[key] = value
									? value
									: initialValues[key];
						}
						if (
							(key == 'office_id' || key == 'province_id') &&
							value
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
				method: 'GET',
				url: '/all_provinces',
			});
			if (status == 200 && response.result == true) {
				setProvinces(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: item.name_fa,
						};
					})
				);
			}
		})();
	}, [callApi]);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: 'GET',
				url: '/all_references',
			});
			if (status == 200 && response.result == true) {
				setReferences(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: item.first_name + ' ' + item.last_name,
						};
					})
				);
			}
		})();
	}, [callApi]);

	// const steps = [
	// 	{
	// 		title: t('general_information'),
	// 		icon: <RxInfoCircled size={22} />,
	// 		step: (
	// 			<Box pos="relative">
	// 				<LoadingOverlay
	// 					visible={loading}
	// 					zIndex={1000}
	// 					overlayProps={{ radius: 'sm', blur: 2 }}
	// 				/>
	// 				<GeneralApplicantStepOne form={form} lng={lng} />
	// 			</Box>
	// 		),
	// 		async validate() {
	// 			form.validate();
	// 			const fieldsToValidate = [
	// 				'name',
	// 				'agent_name',
	// 				'agent_phone',
	// 				'applicant_type',
	// 			];
	// 			const res = fieldsToValidate.every((fieldName) =>
	// 				form.isValid(fieldName)
	// 			);
	// 			return res;
	// 		},
	// 	},
	// 	{
	// 		title: t('location'),
	// 		icon: <PiMapPinAreaBold size={22} />,
	// 		step: (
	// 			<Box pos="relative">
	// 				<LoadingOverlay
	// 					visible={loading}
	// 					zIndex={1000}
	// 					overlayProps={{ radius: 'sm', blur: 2 }}
	// 				/>
	// 				<GeneralApplicantStepTwo
	// 					form={form}
	// 					lng={lng}
	// 					provinces={provinces}
	// 					editDistrict={editDistrict}
	// 					setEditDistrict={setEditDistrict}
	// 					references={references}
	// 					offices={offices}
	// 					office={office}
	// 				/>
	// 			</Box>
	// 		),
	// 		async validate() {
	// 			form.validate();
	// 			let res = form.isValid();
	// 			return res;
	// 		},
	// 	},
	// ];

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

export default ApplicantRequestModal;
