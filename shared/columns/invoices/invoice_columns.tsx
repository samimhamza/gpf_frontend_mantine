import { Center, Badge } from '@mantine/core';
import { getDate } from '../../functions';
import { logColumns } from '../';

export const InvoiceColumns = (
	t: (arg: string) => string,
) => {
	const logs = logColumns(t);
	return [
		{
			accessor: 'id',
			title: t('id'),
			noWrap: true,
			hidden: false,
			sortable: true,
			render: ({ id }: { id: number }) => <Center>{id}</Center>,
		},
		{
			accessor: 'purchaser',
			title: t('purchaser'),
			noWrap: true,
			sortable: true,
			hidden: false,
			render: (record: any) => {
				return record.first_name + ' ' + record.last_name;
			},
		},
		{
			accessor: 'invoice_number',
			title: t('invoice_number'),
			noWrap: true,
			hidden: false,
		},
		{
			accessor: 'vendor_name',
			title: t('vendor_name'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'warehouse_name',
			title: t('warehouse'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'purchase_date',
			title: t('purchase_date'),
			noWrap: true,
			hidden: false,
			render: ({ purchase_date }: { purchase_date: string }) =>
				purchase_date ? getDate(purchase_date) : '',
		},
		{
			accessor: 'due_date',
			title: t('due_date'),
			noWrap: true,
			hidden: false,
			render: ({ due_date }: { due_date: string }) =>
				due_date ? getDate(due_date) : '',
		},
		{
			accessor: 'payment_status',
			title: t('payment_status'),
			noWrap: true,
			hidden: false,
			textAlign: 'center',
			render: ({ payment_status }: { payment_status: string }) => (
				<Badge
					color={
						payment_status == 'paid'
							? 'green'
							: payment_status == 'pending'
								? 'yellow'
								: 'red'
					}
				>
					{t(payment_status)}
				</Badge>
			),
		},
		{
			accessor: 'total_price',
			title: t('total_price'),
			noWrap: true,
			hidden: false,
			textAlign: 'center',
		},
		{
			accessor: 'remarks',
			title: t('remarks'),
			noWrap: true,
			hidden: false,
			render: ({ remarks }: { remarks: string }) => (
				<div title={remarks}>
					{remarks && remarks.length > 50 ? `${remarks.slice(0, 50)}...` : remarks}
				</div>
			),
		},
		...logs,
	];
};
