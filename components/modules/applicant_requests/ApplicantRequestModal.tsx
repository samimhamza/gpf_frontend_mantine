'use client';

import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import { useAxios } from '@/customHooks/useAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, LoadingOverlay } from '@mantine/core';
import { RxInfoCircled } from 'react-icons/rx';

import { ApplicantRequestSchema } from '@/schemas/models/applicant_requests';
import ApplicantRequestStepOne from './ApplicantRequestStepOne';

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
	const applicantRequestSchema = ApplicantRequestSchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);
	const [generalApplicants, setGeneralApplicants] = useState([]);

	const initialValues: any = {
		general_applicant_id: '',
		request: '',
		priority: '',
		descriptions: '',
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(applicantRequestSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const { response, status } = !editId
			? await callApi({
					method: 'POST',
					url: '/general_applicant_requests',
					data: {...form.values, status: 'pending'},
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
				const { response, status } = await callApi({
					method: "GET",
					url: `/general_applicant_requests/${editId}`,
				});
				if (status == 200 && response.result == true) {
					form.setValues({
						request: response.data.request,
						descriptions: response.data.descriptions,
						priority: response.data.priority,
						general_applicant_id: response.data.general_applicant_id.toString(),				
					});
					setLoading(false);
				}
			})();
		}
	}, [editId, callApi]);




	useEffect(() => {
		(async function () {
			const { response, status } = await callApi({
				method: 'GET',
				url: '/all_general_applicants',
			});
			if (status == 200 && response.result == true) {
				setGeneralApplicants(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: item.name,
						};
					})
				);
			}
		})();
	}, [callApi]);

	const steps = [
		{
			title: t('create_request'),
			icon: <RxInfoCircled size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<ApplicantRequestStepOne
						form={form}
						lng={lng}
						generalApplicants={generalApplicants}
					/>
				</Box>
			),
			async validate() {
				form.validate();
				const res = form.isValid();
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
				width="60%"
			/>
		</form>
	);
};

export default ApplicantRequestModal;
