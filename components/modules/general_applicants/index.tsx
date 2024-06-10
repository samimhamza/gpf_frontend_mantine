'use client';

import { CustomDataTable } from '@/components/DataTable';
import { useTranslation } from '@/app/i18n/client';
import CustomBreadCrumb from '@/components/CustomBreadCrumb';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
// import { permissionChecker } from '@/shared/functions/permissionChecker';
// import {
// 	CHANGE_STATUS,
// 	CREATE_TEAMS,
// 	DELETE_TEAMS,
// 	UPDATE_TEAMS,
// } from '@/shared/constants/Permissions';
import { GeneralApplicantColumns } from '@/shared/columns/general_applicants/general_applicant_columns';
import { useRouter } from 'next/navigation';
import GeneralApplicantModal from './GeneralApplicantModal';

export const GeneralApplicantModule = ({ lng }: { lng: string }) => {
	const router = useRouter();
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = GeneralApplicantColumns(t);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit, open]);

	useEffect(() => {
		if (view) {
			router.push(`/general_applicants/${view}`);
		}
	}, [view, router]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t('dashboard'), link: '/dashboard' },
					{ title: t('general_applicants') },
				]}
			/>
			<CustomDataTable
				title={t('general_applicants')}
				url="/general_applicants"
				deleteUrl="/general_applicants/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				setView={setView}
				showAdd={true}
				showDelete={true}
				showEdit={true}
			/>
			{opened && (
				<GeneralApplicantModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t('add_general_applicant') : t('update_general_applicant')}
					editId={edit}
				/>
			)}
		</>
	);
};
