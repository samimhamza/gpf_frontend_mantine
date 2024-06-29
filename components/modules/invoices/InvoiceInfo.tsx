"use client";

import { useTranslation } from "@/app/i18n/client";
import { getDateTime, getDate } from "@/shared/functions";
import { TbEdit } from "react-icons/tb";
import { UPDATE_TEAMS } from "@/shared/constants/Permissions";
import { InvoiceItemsColumns } from "@/shared/columns/invoices/invoice_items_columns";
import { CustomDataTable } from "@/components/DataTable";
import {
  Box,
  Button,
  Flex,
  Grid,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import InvoiceEditModal from "./InvoiceEditModal";
import InvoiceItemModal from "./InvoiceItemModal";
const InvoiceInfo = ({
  lng,
  data,
  loading,
  mutate,
}: {
  invoiceId: string | undefined;
  databaseID: number;
  lng: string;
  data: any;
  loading: boolean;
  mutate: any;
}) => {
  const { t } = useTranslation(lng);
  const [mutated, setMutated] = useState(false);
  const [edit, setEdit] = useState<number>();
  const [view, setView] = useState<number>();

  const invoiceDetails = [
    { label: t("id"), value: data?.id },
    { label: t("invoice_number"), value: data?.invoice_number },
    { label: t("vendor_name"), value: data?.vendor_name },
    { label: t("warehouse"), value: data?.warehouse?.name },
    {
      label: t("purchaser"),
      value:
        data?.purchased_by?.first_name + " " + data?.purchased_by?.last_name,
    },
    {
      label: t("purchase_date"),
      value: getDate(data?.purchase_date?.toString()),
    },
    { label: t("due_date"), value: getDate(data?.due_date?.toString()) },
    { label: t("payment_status"), value: data?.payment_status },
    { label: t("total_price"), value: data?.total_price },
    { label: t("remarks"), value: data?.remarks },
    {
      label: t("created_at"),
      value: data?.created_at && getDateTime(data?.created_at),
    },
    { label: t("created_by"), value: data?.created_by?.full_name },
    {
      label: t("updated_at"),
      value: data?.updated_at && getDateTime(data?.updated_at),
    },
    { label: t("updated_by"), value: data?.updated_by?.full_name },
  ];

  const columns = InvoiceItemsColumns(t);
  const [opened, { open, close }] = useDisclosure(false);
  const [
    isInvoiceEditOpen,
    { open: openInvoiceEdit, close: closeInvoiceEdit },
  ] = useDisclosure(false);

  const checkPermission = (permission: string) => {
    const hasPermission = permissionChecker(permission);
    return hasPermission;
  };


  useEffect(() => {
	  if (edit) {
		  open();
	  }
  }, [edit, open]);

  return (
    <>
      <Paper withBorder shadow="sm" mb="md">
        <Flex
          justify={{ base: "center", xs: "space-between" }}
          align="center"
          className="applicant-title"
          p="md"
          gap="sm"
          wrap="wrap"
        >
          <Title order={3}>{t("invoice_info")}</Title>
          <Group>
            {checkPermission(UPDATE_TEAMS) && (
              <Button
                onClick={() => openInvoiceEdit()}
                rightSection={<TbEdit size={16} />}
              >
                {t("edit")}
              </Button>
            )}
          </Group>
        </Flex>
        <Divider mb="md" />

        <Box pos="relative" p="md">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Grid px="sm">
            {invoiceDetails.map((detail, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                <Text span fw="bold" pe={10}>
                  {detail.label} :
                </Text>
                <Text span>{detail.value}</Text>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Paper>

      <Paper withBorder shadow="sm" mb="md" pb="lg">
        <Title order={3} p="sm" className="applicant-title" ta="center">
          {t("invoice_items")}
        </Title>
        <CustomDataTable
          title={t("invoice_items")}
          url={`/invoice_items?invoice_id=${data?.id}`}
          deleteUrl="/invoice_items/1"
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
      </Paper>

      {opened && (
        <InvoiceItemModal
          opened={opened}  
          lng={lng}
          setMutated={mutate}
		  close={() => {
			close();
			setEdit(undefined);
		}}
		title={!edit ? t('add_item') : t('update_item')}
		editId={edit}
		invoiceId={data?.id}
        />
      )}

      {isInvoiceEditOpen && (
        <InvoiceEditModal
          opened={isInvoiceEditOpen}
          close={() => {
            closeInvoiceEdit();
          }}
          lng={lng}
          setMutated={mutate}
          title={t("update_invoice")}
          editId={data?.id}
        />
      )}
    </>
  );
};

export default InvoiceInfo;
