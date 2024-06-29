import { getDateTime } from '../../functions';

export const InvoiceItemsColumns = (t: (arg: string) => string) => {
	return [
		{
			accessor: 'id',
			title: t('id'),
			noWrap: true,
			hidden: false,
			sortable: true,
			textAlign: 'center',
		},
		{
			accessor: 'item_name',
			title: t('item'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'quantity',
			title: t('quantity'),
			noWrap: true,
			hidden: false,
		},
		{
			accessor: 'unit_price',
			title: t('unit_price'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'total_price',
			title: t('total_price'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'remarks',
			title: t('remarks'),
			noWrap: true,
			hidden: false,
		},
		{
			accessor: 'created_at',
			title: t('created_at'),
			noWrap: true,
			sortable: true,
			render: ({ created_at }: { created_at: string }) =>
				created_at ? getDateTime(created_at) : '',
		},
		{
			accessor: 'item_created_by',
			title: t('created_by'),
			noWrap: true,
			sortable: true,
			render: ({ item_created_by }: { item_created_by: any }) =>
				item_created_by ? item_created_by?.full_name : '',
		},
		{
			accessor: 'updated_at',
			title: t('updated_at'),
			noWrap: true,
			sortable: true,
			render: ({ updated_at }: { updated_at: string }) =>
				updated_at ? getDateTime(updated_at) : '',
		},
		{
			accessor: 'updated_by',
			title: t('updated_by'),
			noWrap: true,
			sortable: true,
			render: ({ item_updated_by }: { item_updated_by: any }) =>
				item_updated_by ? item_updated_by?.full_name : '',
		},		
	];
};
