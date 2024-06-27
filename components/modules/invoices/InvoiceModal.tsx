"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { Value } from "react-multi-date-picker";

import { InvoiceWithItemsSchema } from "@/schemas/models/invoices";
import InvoiceStepOne from "./InvoiceStepOne";
import useOffice from "@/customHooks/useOffice";
import InvoiceStepTwo from "./InvoiceStepTwo";
import { IoListOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";

const InvoiceModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
}) => {
  const { t } = useTranslation(lng);
  const invoiceWithItemsSchema = InvoiceWithItemsSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [purchaseDateErrorMessage, setPurchaseDateErrorMessage] = useState("");
  const [purchaseDate, setPurchaseDate] = useState<Value>();
  const [dueDateErrorMessage, setDueDateErrorMessage] = useState("");
  const [dueDate, setDueDate] = useState<Value>();

  const initialValues: any = {
    purchased_by: "",
    warehouse_id: "",
    vendor_name: "",
    invoice_number: "",
    purchase_date: null,
    due_date: null,
    payment_status: "",
    total_price: "",
    remarks: "",

    invoice_items: [
      {
        item_id: "",
        item_unit: "",
        remarks: "",
        quantity: "",
        unit_price: "",
        total_price: "",
      },
    ],
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(invoiceWithItemsSchema),
    validateInputOnBlur: true,
  });

  const { offices, office } = useOffice(form);

  const submit = async () => {
    const { response, status, error } = await callApi({
      method: "POST",
      url: "/invoices",
      data: form.values,
    });
    if (status == 201 && response.result) {
      await setMutated(true);
      return true;
    }
    toast.error(t("something_went_wrong"));
    return false;
  };

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_employees",
      });
      if (status == 200 && response.result == true) {
        setEmployees(
          response.data.map((item: any) => {
            return {
              value: item.id.toString(),
              label: item.first_name + " " + item.last_name,
            };
          })
        );
      }
    })();
  }, [callApi]);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_warehouses",
      });
      if (status == 200 && response.result == true) {
        setWarehouses(
          response.data.map((item: any) => {
            return {
              value: item.id.toString(),
              label: item.name,
            };
          })
        );
      }
    })();
  }, [callApi]);

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

  const steps = [
    {
      title: t("invoice_info"),
      icon: <TbFileInvoice size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <InvoiceStepOne
            purchaseDateErrorMessage={purchaseDateErrorMessage}
            setPurchaseDateErrorMessage={setPurchaseDateErrorMessage}
            dueDateErrorMessage={dueDateErrorMessage}
            setDueDateErrorMessage={setDueDateErrorMessage}
            purchaseDate={purchaseDate}
            dueDate={dueDate}
            setPurchaseDate={setPurchaseDate}
            setDueDate={setDueDate}
            form={form}
            lng={lng}
            employees={employees}
            warehouses={warehouses}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        const fieldsToValidate = [
          "purchased_by",
          "warehouse_id",
          "vendor_name",
          "invoice_number",
          "purchase_date",
          "due_date",
          "payment_status",
          "total_price",
          "remarks",
        ];
        const res = fieldsToValidate.every((fieldName) =>
          form.isValid(fieldName)
        );
        return res;
      },
    },
    {
      title: t("invoice_items"),
      icon: <IoListOutline size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <InvoiceStepTwo
            form={form}
            lng={lng}
            items={items}
            // offices={offices}
            // office={office}
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
        editId={0}
        width="80%"
      />
    </form>
  );
};

export default InvoiceModal;
