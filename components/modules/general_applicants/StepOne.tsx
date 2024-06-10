'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, MultiSelect, Select, TextInput } from '@mantine/core';

interface StepOneProps {
	form: any;
	lng: string;
	offices: Array<{ value: string; label: string }>;
	employees: Array<{ value: string; label: string }>;
	office: string | null;
}

const StepOne = ({ form, lng, offices, employees, office }: StepOneProps) => {
	const { t } = useTranslation(lng);

	return (
		<>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t('name')}
					placeholder={t('name')}
					withAsterisk
					{...form.getInputProps('name')}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('agent_name')}
					placeholder={t('agent_name')}
					withAsterisk
					{...form.getInputProps('agent_name')}
				/>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t('agent_phone')}
					placeholder={t('agent_phone')}
					withAsterisk
					{...form.getInputProps('agent_phone')}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('descriptions')}
					placeholder={t('descriptions')}
					withAsterisk
					{...form.getInputProps('descriptions')}
				/>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="sm"
				p="sm"
				justify={{ sm: 'center' }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t('address')}
					placeholder={t('address')}
					withAsterisk
					{...form.getInputProps('address')}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('applicant_type')}
					placeholder={t('applicant_type')}
					withAsterisk
					{...form.getInputProps('applicant_type')}
				/>
			</Flex>
		</>
	);
};

export default StepOne;
