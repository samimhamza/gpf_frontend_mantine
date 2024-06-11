'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, Select, Textarea } from '@mantine/core';

interface ApplicantRequestStepOneProps {
	form: any;
	lng: string;
	generalApplicants: Array<{ value: string; label: string }>;

}

const ApplicantRequestStepOne = ({ form, lng, generalApplicants }: ApplicantRequestStepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<Select
					style={{ flex: 1 }}
					label={t('applicant_name')}
					placeholder={t('applicant_name')}
					data={generalApplicants}
					searchable
					clearable
					withAsterisk
					nothingFoundMessage={t('noting_found')}
					{...form.getInputProps('general_applicant_id')}
				/>
				<Select
					style={{ flex: 1 }}
					checkIconPosition="right"
					label={t('priority')}
					placeholder={t('priority')}
					withAsterisk
					data={[
						{ value: 'high', label: t('high') },
						{ value: 'medium', label: t('medium') },
						{ value: 'low', label: t('low') },
					]}
					{...form.getInputProps('priority')}
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
					label={t('request_content')}
					placeholder={t('request_content')}
					minRows={4}
					style={{ flex: 1 }}
					{...form.getInputProps('request')}
				/>
			</Flex>
			
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<Textarea
					label={t('descriptions')}
					placeholder={t('descriptions')}
					minRows={4}
					style={{ flex: 1 }}
					{...form.getInputProps('descriptions')}
				/>
			</Flex>
		</>
	);
};

export default ApplicantRequestStepOne;
