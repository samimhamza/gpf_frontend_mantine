'use client';

import { CustomDataTable } from '@/components/DataTable';
import { useTranslation } from '@/app/i18n/client';
import CustomBreadCrumb from '@/components/CustomBreadCrumb';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { permissionChecker } from "@/shared/functions/permissionChecker";
import {
	CHANGE_STATUS,
	CREATE_TEAMS,
	DELETE_TEAMS,
	UPDATE_TEAMS,
} from '@/shared/constants/Permissions';
import { ApplicantRequestColumns } from '@/shared/columns/general_applicants/applicant_request_columns';
import { useRouter } from 'next/navigation';
import ApplicantRequestModal from './ApplicantRequestModal';

export const ApplicantRequestModule = ({ lng }: { lng: string }) => {
	const router = useRouter();
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = ApplicantRequestColumns(
		t,
		permissionChecker(CHANGE_STATUS),
		"/general_applicant_requests/",
		setMutated
	  );
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
			router.push(`/general_applicant_requests/${view}`);
		}
	}, [view, router]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t('dashboard'), link: '/dashboard' },
					{ title: t('general_applicant_requests') },
				]}
			/>
			<CustomDataTable
				title={t('general_applicant_requests')}
				url="/general_applicant_requests"
				deleteUrl="/general_applicant_requests/1"
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
				<ApplicantRequestModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={!edit ? t('add_applicant_request') : t('update_applicant_request')}
					editId={edit}
				/>
			)}
		</>
	);
};
