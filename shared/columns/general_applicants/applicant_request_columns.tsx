import { Center } from '@mantine/core';
import { statusColum } from '../statusColum';
import { Dispatch, SetStateAction } from "react";

export const ApplicantRequestColumns = (
	t: (arg: string) => string,
	showStatus: boolean,
	statusUrl: string,
	setMutated: Dispatch<SetStateAction<boolean>>
) => {
	// const logs = logColumns(t);

	const statuses = [
		{
			status: 'approved',
			color: 'green',
			text: t('approved'),
		},
		{
			status: 'rejected',
			color: 'red',
			text: t('rejected'),
		},
		{
			status: 'pending',
			color: 'yellow',
			text: t('pending'),
		},
	];

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
			accessor: 'name',
			title: t('applicant_name'),
			noWrap: true,
			sortable: true,
			hidden: false,
		},
		{
			accessor: 'request',
			title: t('request'),
			noWrap: true,
			hidden: true,
			render: ({ request }: { request: string }) => (
				<div title={request}>
					{request && request.length > 50
						? `${request.slice(0, 50)}...`
						: request}
				</div>
			),
		},
		statusColum(t, statuses, statusUrl, showStatus, setMutated),
		{
			accessor: 'priority',
			title: t('priority'),
			noWrap: true,
			sortable: true,
			hidden: false,
			render: ({ priority }: { priority: string }) => (
				<div title={priority}>{t(priority)}</div>
			),
		},
		{
			accessor: 'descriptions',
			title: t('descriptions'),
			noWrap: true,
			hidden: false,
			render: ({ descriptions }: { descriptions: string }) => (
				<div title={descriptions}>
					{descriptions && descriptions.length > 50
						? `${descriptions.slice(0, 50)}...`
						: descriptions}
				</div>
			),
		},
	];
};
