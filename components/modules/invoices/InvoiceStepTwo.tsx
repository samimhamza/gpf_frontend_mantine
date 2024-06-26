'use client';

import { useTranslation } from '@/app/i18n/client';
import {
	Flex,
	Select,
	Center,
	TextInput,
	ActionIcon,
	Table,
	NumberInput,
} from '@mantine/core';
import { TbClick } from 'react-icons/tb';
import { RxTrash, RxPlus } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useAxios } from '@/customHooks/useAxios';

interface Item {
	value: string;
	label: string;
	unit: string;
}

interface InvoiceStepTwoProps {
	form: any;
	lng: string;
	items: Item[];
}

const InvoiceStepTwo = ({ form, lng, items }: InvoiceStepTwoProps) => {
	const { t } = useTranslation(lng);

	const handleItemChange = (value: string | null, index: number) => {
		form.setFieldValue(`invoice_items.${index}.item_id`, value);
		let item = items.find((item) => item.value == value);
		form.setFieldValue(`invoice_items.${index}.item_unit`, item?.unit);
	};
	
	const handleTotalPrice = (value: number, index: number, field: string) => {
		let quantity, unitPrice = 0;
		const item = form.values?.invoice_items[index];
		if (field == 'quantity') {
			quantity = value;
			unitPrice = parseFloat(item?.unit_price);
		} else {
			unitPrice = value;
			quantity = parseFloat(item?.quantity);
		}

		const calculatedTotalPrice = quantity * unitPrice;
		form.setFieldValue(
			`invoice_items.${index}.total_price`,
			calculatedTotalPrice
		);
	};

	const addNewRow = () => {
		form.insertListItem('invoice_items', {
			item_id: '',
			item_unit: '',
			remarks: '',
			quantity: '',
			unit_price: '',
			total_price: '',
		});
	};

	const removeRow = (index: number) => {
		if (form.values.invoice_items.length !== 1) {
			form.removeListItem('invoice_items', index);
		}
	};

	const callApi = useAxios();
	const [loading, setLoading] = useState(false);

	return (
		<>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>
							{t('item')} <span style={{ color: 'red' }}>*</span>
						</Table.Th>
						<Table.Th>
							{t('quantity')}{' '}
							<span style={{ color: 'red' }}>*</span>
						</Table.Th>
						<Table.Th>
							{t('unit_price')}{' '}
							<span style={{ color: 'red' }}>*</span>
						</Table.Th>
						<Table.Th>
							{t('total_price')}{' '}
							<span style={{ color: 'red' }}>*</span>
						</Table.Th>
						<Table.Th>{t('remarks')}</Table.Th>
						<Table.Th>
							<Center>
								<TbClick size={16} />
							</Center>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{form.values.invoice_items.map(
						(
							invoice_item: {
								item_id: '';
								item_unit: '';
								remarks: '';
								quantity: null;
								unit_price: null;
								total_price: null;
							},
							index: number
						) => (
							<Table.Tr key={index}>
								<Table.Td>
									<Select
										checkIconPosition="right"
										placeholder={t('item')}
										data={items}
										onOptionSubmit={(value) =>
											handleItemChange(value, index)
										}
										searchable
										clearable
										withAsterisk
										nothingFoundMessage={t('noting_found')}
										{...form.getInputProps(
											`invoice_items.${index}.item_id`
										)}
									/>
								</Table.Td>
								<Table.Td>
									<NumberInput
										placeholder={
											t('quantity') +
											` (${form.values?.invoice_items[index]?.item_unit || t('unit')})`
										}
										withAsterisk
										{...form.getInputProps(
											`invoice_items.${index}.quantity`
										)}
										onInput={(event) => {
											const value = parseFloat(
												(
													event.target as HTMLInputElement
												).value
											);
											form.setFieldValue(
												`invoice_items.${index}.quantity`,
												value
											);
											handleTotalPrice(
												value,
												index,
												'quantity'
											);
										}}
									/>
								</Table.Td>
								<Table.Td>
									<NumberInput
										placeholder={
											t('unit_price') +
											` (${form.values?.invoice_items[index]?.item_unit || t('unit')})`
										}
										{...form.getInputProps(
											`invoice_items.${index}.unit_price`
										)}
										onInput={(event) => {
											const value = parseFloat(
												(
													event.target as HTMLInputElement
												).value
											);
											form.setFieldValue(
												`invoice_items.${index}.unit_price`,
												value
											);
											handleTotalPrice(
												value,
												index,
												'unit_price'
											);
										}}
									/>
								</Table.Td>
								<Table.Td>
									<NumberInput
										placeholder={t('total_price')}
										{...form.getInputProps(
											`invoice_items.${index}.total_price`
										)}
									/>
								</Table.Td>
								<Table.Td>
									<TextInput
										placeholder={t('remarks')}
										{...form.getInputProps(
											`invoice_items.${index}.remarks`
										)}
									/>
								</Table.Td>
								<Table.Td>
									<Flex gap="sm" px="sm" justify="flex-end">
										{form.values.invoice_items.length - 1 ==
											index && (
											<ActionIcon
												variant="light"
												onClick={addNewRow}
											>
												<RxPlus size={20} />
											</ActionIcon>
										)}

										<ActionIcon
											disabled={
												form.values.invoice_items
													.length === 1
											}
											color="red"
											variant="light"
											onClick={() => removeRow(index)}
										>
											<RxTrash size={20} />
										</ActionIcon>
									</Flex>
								</Table.Td>
							</Table.Tr>
						)
					)}
				</Table.Tbody>
			</Table>
		</>
	);
};

export default InvoiceStepTwo;
