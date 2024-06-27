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
import { InvoiceColumns } from '@/shared/columns/invoices/invoice_columns';
import { useRouter } from 'next/navigation';
import InvoiceModal from './InvoiceModal';
import InvoiceEditModal from './InvoiceEditModal';
export const InvoiceModule = ({ lng }: { lng: string }) => {
	const router = useRouter();
	const { t } = useTranslation(lng);
	const [mutated, setMutated] = useState(false);
	const columns = InvoiceColumns(t);
	const [opened, { open, close }] = useDisclosure(false);
	const [isEditInvoiceModalOpened, { open: openEditInvoiceModal, close: closeEditInvoiceModal }] = useDisclosure(false);

	const [edit, setEdit] = useState<number>();
	const [view, setView] = useState<number>();

	useEffect(() => {
		if (edit) {
			console.log("edit is here:::    " + edit);
			
			openEditInvoiceModal();
		}
	}, [edit, isEditInvoiceModalOpened]);

	useEffect(() => {
		if (view) {
			router.push(`/invoices/${view}`);
		}
	}, [view, router]);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t('dashboard'), link: '/dashboard' },
					{ title: t('invoices') },
				]}
			/>
			<CustomDataTable
				title={t('invoices')}
				url="/invoices"
				deleteUrl="/invoices/1"
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
				<InvoiceModal
					opened={opened}
					close={() => {
						close();
					}}
					lng={lng}
					setMutated={setMutated}
					title={t('add_invoice')}
				/>
			)}

			{isEditInvoiceModalOpened && (
				<InvoiceEditModal
					opened={isEditInvoiceModalOpened}
					close={() => {
						closeEditInvoiceModal();
						setEdit(undefined)
					}}
					lng={lng}
					setMutated={setMutated}
					title={t('edit_invoice')}
					editId={edit}				
				/>
			)}

		</>
	);
};
