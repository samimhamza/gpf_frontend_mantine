import { Center, Badge } from '@mantine/core';
import { logColumns } from '../';
import { getDateTime } from "@/shared/functions";

export const ApplicantRequestInfoColumns = (t: (arg: string) => string) => {
	const logs = logColumns(t);

	const getColor = (status: string) => {
		const colors: Record<string, string> = {
			high: 'red',
			medium: 'blue',
			low: 'green',
			approved: 'green',
			rejected: 'red',
			pending: 'yellow',
		};
		return colors[status] || 'green';
	};

	return [
		{
			accessor: 'id',
			title: t('id'),
			noWrap: true,
			render: ({ id }: { id: number }) => <Center>{id}</Center>,
		},
		{
			accessor: 'request',
			title: t('request'),
			noWrap: true,
		},

		{
			accessor: 'priority',
			title: t('priority'),
			noWrap: true,
			render: ({ priority }: { priority: string }) => (
				<Center>
					<Badge
						size="lg"
						style={{ cursor: 'pointer' }}
						color={getColor(priority)}
					>
						{t(priority)}
					</Badge>
				</Center>
			),
		},
		{
			accessor: 'descriptions',
			title: t('descriptions'),
			noWrap: true,
		},
		{
			accessor: 'status',
			title: t('status'),
			noWrap: true,
			render: ({ status }: { status: string }) => (
				<Center>
					<Badge
						size="lg"
						style={{ cursor: 'pointer' }}
						color={getColor(status)}
					>
						{t(status)}
					</Badge>
				</Center>
			),
		},
		{
			accessor: 'reason',
			title: t('reason'),
			noWrap: true,
			render: (record: any) =>
				record.decision ? t(record.decision.reason) : '',
		},
		{
			accessor: 'decided_by',
			title: t('decided_by'),
			noWrap: true,
			render: (record: any) =>
				record.decision && record.decision.user ? record.decision.user.full_name : '',
		},
		{
			accessor: 'decided_at',
			title: t('decided_at'),
			noWrap: true,		
			render: (record: any) =>
				record.decision ? getDateTime(record.decision.decided_at) : '',
		},
		// ...logs
	];
};
