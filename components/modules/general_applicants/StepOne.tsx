'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, MultiSelect, Select, TextInput, Textarea } from '@mantine/core';

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
				<Select
					style={{ flex: 1 }}
					checkIconPosition="right"
					label={t('applicant_type')}
					placeholder={t('applicant_type')}
					withAsterisk
					data={[
						{ value: 'mosque', label: t('mosque') },
						{ value: 'community', label: t('community') },
						{ value: 'program', label: t('program') },
						{ value: 'other', label: t('other') },
					]}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('name')}
					placeholder={t('name')}
					withAsterisk
					{...form.getInputProps('name')}
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
					label={t('agent_name')}
					placeholder={t('agent_name')}
					withAsterisk
					{...form.getInputProps('agent_name')}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('agent_phone')}
					placeholder={t('agent_phone')}
					withAsterisk
					{...form.getInputProps('agent_phone')}
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
				/>
			</Flex>
		</>
	);
};

export default StepOne;
