'use client';

import { useTranslation } from '@/app/i18n/client';
import CustomBreadCrumb from '@/components/CustomBreadCrumb';
import { CustomDataTable } from '@/components/DataTable';
import { OfficeColumns } from '@/shared/columns/office.columns';
import {
  CHANGE_STATUS,
  CREATE_OFFICES,
  DELETE_OFFICES,
  UPDATE_OFFICES,
} from '@/shared/constants/Permissions';
import { permissionChecker } from '@/shared/functions/permissionChecker';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import ReferenceModal from './ReferenceModal';

export const ReferenceModule = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);

  const columns = OfficeColumns(
    t,
    permissionChecker(CHANGE_STATUS),
    '/references/',
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

  return (
    <>
      <CustomBreadCrumb
        items={[
          { title: t('dashboard'), link: '/dashboard' },
          { title: t('references') },
        ]}
      />

      <CustomDataTable
        title={t('references')}
        url='/references'
        deleteUrl='/references/1'
        lng={lng}
        columns={columns}
        open={open}
        mutated={mutated}
        setMutated={setMutated}
        setEdit={setEdit}
        setView={setView}
        showAdd={permissionChecker(CREATE_OFFICES)}
        showDelete={permissionChecker(DELETE_OFFICES)}
        showEdit={permissionChecker(UPDATE_OFFICES)}
        showView={false}
      />
      {opened && (
        <ReferenceModal
          opened={opened}
          close={() => {
            close();
            setEdit(undefined);
          }}
          lng={lng}
          setMutated={setMutated}
          title={!edit ? t('add_reference') : t('update_reference')}
          editId={edit}
        />
      )}
    </>
  );
};
