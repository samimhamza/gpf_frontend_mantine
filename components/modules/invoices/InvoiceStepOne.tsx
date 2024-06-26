'use client';

import { useTranslation } from '@/app/i18n/client';
import { Flex, Select, NumberInput, TextInput, Textarea } from '@mantine/core';
import PersianDatePicker from '@/components/PersianDatePicker';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Value } from 'react-multi-date-picker';
import { getTime } from '@/shared/functions';

interface InvoiceStepOneProps {
	form: any;
	lng: string;
	employees: any;
	warehouses: any;
	purchaseDateErrorMessage: string;
	setPurchaseDateErrorMessage: Dispatch<SetStateAction<string>>;
	dueDateErrorMessage: string;
	setDueDateErrorMessage: Dispatch<SetStateAction<string>>;
	purchaseDate: Value | undefined;
	setPurchaseDate: Dispatch<SetStateAction<Value | undefined>>;
	dueDate: Value | undefined;
	setDueDate: Dispatch<SetStateAction<Value | undefined>>;
}

const InvoiceStepOne = ({
	form,
	lng,
	employees,
	warehouses,
	purchaseDateErrorMessage,
	setPurchaseDateErrorMessage,
	dueDateErrorMessage,
	setDueDateErrorMessage,
	purchaseDate,
	dueDate,
	setPurchaseDate,
	setDueDate,
}: InvoiceStepOneProps) => {
	const { t } = useTranslation(lng);
	useEffect(() => {
		if (purchaseDate) {
			setPurchaseDateErrorMessage('');
			form.setFieldValue('purchase_date', getTime(purchaseDate));
		} else {
			form.setFieldValue('purchase_date', null);
		}
	}, [purchaseDate]);

	useEffect(() => {
		setDueDateErrorMessage('');
		if (dueDate) {
			form.setFieldValue('due_date', getTime(dueDate));
		} else {
			form.setFieldValue('due_date', null);
		}
	}, [dueDate]);

	useEffect(() => {
		if (dueDate && purchaseDate) {
			if (dueDate < purchaseDate) {
				setDueDateErrorMessage(t('due_date_must_be_greater'));
			}
		}
	}, [purchaseDate, dueDate]);

	return (
		<>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="md"
				p="md"
				justify={{ sm: 'center' }}
			>
				<Select
					style={{ flex: 1 }}
					checkIconPosition="right"
					label={t('purchaser')}
					placeholder={t('purchaser')}
					withAsterisk
					data={employees}
					{...form.getInputProps('purchased_by')}
				/>
				<TextInput
					style={{ flex: 1 }}
					label={t('invoice_number')}
					placeholder={t('invoice_number')}
					withAsterisk
					{...form.getInputProps('invoice_number')}
				/>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="md"
				p="md"
				justify={{ sm: 'center' }}
			>
				<TextInput
					style={{ flex: 1 }}
					label={t('vendor_name')}
					placeholder={t('vendor_name')}
					withAsterisk
					{...form.getInputProps('vendor_name')}
				/>
				<Select
					style={{ flex: 1 }}
					checkIconPosition="right"
					label={t('warehouse')}
					placeholder={t('warehouse')}
					withAsterisk
					data={warehouses}
					{...form.getInputProps('warehouse_id')}
				/>
				<Select
					checkIconPosition="right"
					style={{ flex: 1 }}
					label={t('payment_status')}
					placeholder={t('payment_status')}
					withAsterisk
					data={[
						{ value: 'paid', label: t('paid') },
						{ value: 'pending', label: t('pending') },
						{ value: 'overdue', label: t('overdue') },
					]}
					{...form.getInputProps('payment_status')}
				/>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="md"
				p="md"
				justify={{ sm: 'center' }}
			>
				<PersianDatePicker
					label={t('purchase_date')}
					placeholder={t('purchase_date')}
					value={purchaseDate}
					onChange={setPurchaseDate}
					errorMessage={form.errors?.purchase_date}
				/>
				<PersianDatePicker
					label={t('due_date')}
					placeholder={t('due_date')}
					value={dueDate}
					onChange={setDueDate}
					errorMessage={form.errors?.due_date}
				/>
				<NumberInput
					style={{ flex: 1 }}
					label={t('total_price')}
					placeholder={t('total_price')}
					withAsterisk
					{...form.getInputProps('total_price')}
				/>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				gap="md"
				p="md"
				justify={{ sm: 'center' }}
			>
				<Textarea
					placeholder={t('remarks')}
					label={t('remarks')}
					minRows={4}
					style={{ flex: 1 }}
					{...form.getInputProps('remarks')}
				/>
			</Flex>
		</>
	);
};

export default InvoiceStepOne;
