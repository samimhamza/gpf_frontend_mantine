import { Center } from '@mantine/core';

export const GeneralApplicantColumns = (t: (arg: string) => string) => {
	return [
		{
			accessor: 'id',
			title: t('id'),
			noWrap: true,
			sortable: true,
			render: ({ id }: { id: number }) => <Center>{id}</Center>,
		},
		{
			accessor: 'name',
			title: t('name'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'agent_name',
			title: t('agent_name'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'agent_phone',
			title: t('phone'),
			noWrap: true,
		},
		{
			accessor: 'descriptions',
			title: t('descriptions'),
			noWrap: true,
		},
		{
			accessor: 'applicant_type',
			title: t('applicant_type'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'address',
			title: t('address'),
			noWrap: true,
		},
		{
			accessor: 'province_id',
			title: t('province'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'district_id',
			title: t('district'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'office_id',
			title: t('office'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'referenced_by',
			title: t('reference'),
			noWrap: true,
			sortable: true,
		}
	];
};
