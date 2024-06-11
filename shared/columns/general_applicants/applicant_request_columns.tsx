import { Center } from '@mantine/core';

export const ApplicantRequestColumns = (t: (arg: string) => string) => {
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
			title: t('applicant_name'),
			noWrap: true,
			sortable: true,
		},
		{
			accessor: 'request',
			title: t('request'),
			noWrap: true,
			render: ({ request }: { request: string }) => (
				<div title={request}>
					{request && request.length > 50 ? `${request.slice(0, 50)}...` : request}
				</div>
			),
		},
		{
			accessor: 'status',
			title: t('status'),
			noWrap: true,
			sortable: true,
            render: ({ status }: { status: string }) => (
				<div title={status}>
					{t(status)}
				</div>
			),
		},
		{
			accessor: 'priority',
			title: t('priority'),
			noWrap: true,
			sortable: true,
            render: ({ priority }: { priority: string }) => (
				<div title={priority}>
					{t(priority)}
				</div>
			),
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
        
        
	];
};
