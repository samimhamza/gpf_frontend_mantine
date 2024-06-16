'use client';

import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from '@/app/i18n/client';
import CustomModal from '@/components/CustomModal';
import { useAxios } from '@/customHooks/useAxios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
	Box,
	LoadingOverlay,
	Textarea,
	Flex,
	Select,
	Center,
} from '@mantine/core';
import { RxInfoCircled } from 'react-icons/rx';

import { ApplicantRequestDecisionSchema } from '@/schemas/models/applicant_request_decision';

const ApplicantRequestDecisionModal = ({
	opened,
	close,
	lng,
	setMutated,
	title,
	parentId,
	editId,
	selectedStatus,
}: {
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: any;
	title: string;
	parentId: number | undefined;
	editId: number | undefined;
	selectedStatus: string;
}) => {
	const { t } = useTranslation(lng);
	const applicantRequestDecisionSchema = ApplicantRequestDecisionSchema(t);
	const callApi = useAxios();
	const [loading, setLoading] = useState(false);

	const initialValues: any = {
		general_applicant_request_id: '',
		reason: '',
		status: '',
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(applicantRequestDecisionSchema),
		validateInputOnBlur: true,
	});

	const submit = async () => {
		const data = {
			status: selectedStatus,
			reason: form.values.reason,
			general_applicant_request_id: parentId,
		};
		console.log('some data from submission', data, form);

		const { response, status } = await callApi({
			method: 'POST',
			url: '/applicant_request_decisions',
			data: data,
		});

		if (status == 201 && response.result) {
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

	// useEffect(() => {
	// 	if (editId) {
	// 		(async function () {
	// 			setLoading(true);
	// 			const { response, status } = await callApi({
	// 				method: "GET",
	// 				url: `/general_applicant_requests/${editId}`,
	// 			});
	// 			if (status == 200 && response.result == true) {
	// 				let values: any = {};
	// 				form.setValues({
	// 					request: response.data.request,
	// 					descriptions: response.data.descriptions,
	// 					priority: response.data.priority,
	// 					general_applicant_id: response.data.general_applicant_id.toString(),
	// 				});
	// 				setLoading(false);
	// 			}
	// 		})();
	// 	}
	// }, [editId, callApi]);

	const steps = [
		{
			title: t('make_decision'),
			icon: <RxInfoCircled size={22} />,
			step: (
				<Box pos="relative">
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: 'sm', blur: 2 }}
					/>
					<Flex
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						p="sm"
						justify={{ sm: 'center' }}
					>
						<Select
							style={{ flex: 1 }}
							checkIconPosition="right"
							label={t('status')}
							placeholder={t('status')}
							withAsterisk
							disabled
							value={selectedStatus}
							data={[
								{ value: 'approved', label: t('approved') },
								{ value: 'rejected', label: t('rejected') },
								{ value: 'pending', label: t('pending') },
							]}
						/>
					</Flex>

					<Flex
						direction={{ base: 'column', sm: 'row' }}
						gap="sm"
						p="sm"
						justify={{ sm: 'center' }}
					>
						<Textarea
							withAsterisk
							label={t('reason')}
							placeholder={t('reason')}
							minRows={4}
							style={{ flex: 1 }}
							{...form.getInputProps('reason')}
						/>
					</Flex>
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

export default ApplicantRequestDecisionModal;
