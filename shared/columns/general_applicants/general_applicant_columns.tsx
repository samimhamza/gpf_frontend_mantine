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
			render: ({ descriptions }: { descriptions: string }) => (
				<div title={descriptions}>
					{descriptions && descriptions.length > 50 ? `${descriptions.slice(0, 50)}...` : descriptions}
				</div>
			),
		},
		{
			accessor: 'applicant_type',
			title: t('applicant_type'),
			noWrap: true,
			sortable: true,
			render: ({ applicant_type }: { applicant_type: string }) => (
				<div title={applicant_type}>
					{t(applicant_type)}
				</div>
			),
		},
		{
			accessor: 'province_name',
			title: t('province'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'district_name',
			title: t('district'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'address',
			title: t('address'),
			noWrap: true,
			render: ({ descriptions }: { descriptions: string }) => (
				<div title={descriptions}>
					{descriptions && descriptions.length > 30 ? `${descriptions.slice(0, 30)}...` : descriptions}
				</div>
			),
		},
		{
			accessor: 'office_name',
			title: t('office'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'first_name',
			title: t('referenced_by'),
			noWrap: true,
			sortable: true,
			// render: ({ reference }: {reference: any}) => `${reference.first_name} ${reference.last_name}`,
		},
	];
};
