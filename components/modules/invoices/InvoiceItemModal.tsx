"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { InvoiceItemSchema } from "@/schemas/models/invoices";
import InvoiceItemStepOne from "./InvoiceItemStepOne";
import { TbFileInvoice } from "react-icons/tb";

const InvoiceEditModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
  editId,
  invoiceId,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
  editId: number | undefined;
  invoiceId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const invoiceItemSchema = InvoiceItemSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const initialValues: any = {
    invoice_id: '',
    item_id: '',
    quantity: null,
    unit_price: null,
    total_price: null,
    remarks: ''
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(invoiceItemSchema),
    validateInputOnBlur: true,
  });

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_items",
      });
      if (status == 200 && response.result == true) {
        setItems(
          response.data.map((item: any) => {
            return {
              value: item.id.toString(),
              label: item.name,
              unit: item.unit,
            };
          })
        );
      }
    })();
  }, [callApi]);


  const submit = async () => {
    const { response, status, error } = !editId
        ? await callApi({
                method: 'POST',
                url: '/invoice_items',
                data: {...form.values, invoice_id: invoiceId},
            })
        : await callApi({
                method: 'PUT',
                url: `/invoice_items/${editId}`,
                data: form.values,
            });
    if ((!editId ? status == 201 : status == 202) && response.result) {
        await setMutated(true);
        return true;
    }
    if (status == 422) {
        toast.error(t('editing_not_allowed'));
        // close();
        return false;
    }
    toast.error(t('something_went_wrong'));
    return false;
};

  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status } = await callApi({
          method: "GET",
          url: `/invoice_items/${editId}`,
        });
        if (status == 200 && response.result == true) {
          const {
            item_id,
            invoice_id,           
            quantity,
            unit_price,
            total_price,
            remarks,          
          } = response.data;

          const parsedValues = {
            item_id: item_id.toString(),
            invoice_id: invoice_id.toString(),
            quantity: parseInt(quantity),
            unit_price: parseFloat(unit_price),
            total_price: parseFloat(total_price),
            remarks,
          };

          form.setValues(parsedValues);
          setLoading(false);
        }
      })();
    }
  }, [editId, callApi]);


  const steps = [
    {
      title: t("add_item"),
      icon: <TbFileInvoice size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        <InvoiceItemStepOne     
            form={form}
            lng={lng}
            items={items}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        let res = form.isValid();
        return res;
      },
    },
  ];

  return (
    <form>
      <CustomModal
        opened={opened}
        close={close}
        steps={steps}
        form={form}
        submit={submit}
        lng={lng}
        title={title}
        editId={editId}
        width="60%"
      />
    </form>
  );
};

export default InvoiceEditModal;
