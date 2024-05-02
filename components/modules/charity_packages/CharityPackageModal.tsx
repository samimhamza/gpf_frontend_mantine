"use client";

import CharityPackageStepOne from "@/components/modules/charity_packages/CharityPackageStepOne";
import { useForm, zodResolver } from "@mantine/form";
import { CharityPackageSchema } from "@/schemas/models/charity_packages";
import { BiSolidBox } from "react-icons/bi";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Box, LoadingOverlay } from "@mantine/core";
import { IoIosListBox } from "react-icons/io";
import CharityPackageStepTwo from "./CharityPackageStepTwo";
import { type Value } from "react-multi-date-picker";
import { getTimeValue } from "@/shared/functions";
import useOffice from "@/customHooks/useOffice";

const CharityPackageModal = ({
  opened,
  close,
  lng,
  setMutated,
  title,
  editId,
}: {
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: any;
  title: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const itemSchema = CharityPackageSchema(t);
  const callApi = useAxios();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState<any>([]);
  const [startDateErrorMessage, setStartDateErrorMessage] = useState("");
  const [startDate, setStartDate] = useState<Value>();
  const [endDateErrorMessage, setEndDateErrorMessage] = useState("");
  const [endDate, setEndDate] = useState<Value>();

  const initialValues: any = useMemo(() => {
    return {
      name: "",
      office_id: "",
      category_id: "",
      period: "",
      start_date: null,
      end_date: null,
      cash_amount: "",
      currency: "",
      items: [{ item_id: "", quantity: "", unit: "" }],
    };
  }, []);

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(itemSchema),
    validateInputOnBlur: true,
  });

  const { offices, office } = useOffice(form);

  const submit = async () => {
    const { response, status } = !editId
      ? await callApi({
          method: "POST",
          url: "/charity_packages",
          data: form.values,
        })
      : await callApi({
          method: "PUT",
          url: `/charity_packages/${editId}`,
          data: form.values,
        });
    if ((!editId ? status == 201 : status == 202) && response.result) {
      await setMutated(true);
      return true;
    }
    if (status == 422) {
      toast.error(t("editing_not_allowed"));
      close();
      return false;
    }
    toast.error(t("something_went_wrong"));
    return false;
  };

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_categories",
      });
      if (status == 200 && response.result == true) {
        setCategories(
          response.data.map((item: any) => {
            return { value: item.id.toString(), label: item.name };
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

  useEffect(() => {
    if (editId) {
      (async function () {
        setLoading(true);
        const { response, status, error } = await callApi({
          method: "GET",
          url: `/charity_packages/${editId}`,
        });
        if (status == 200 && response.result == true) {
          let values: any = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (Object.keys(initialValues).includes(key)) {
              if (
                key != "office_id" &&
                key != "category_id" &&
                key != "period" &&
                key != "items" &&
                key != "cash_amount" &&
                key != "start_date" &&
                key != "end_date"
              ) {
                values[key] = value ? value : initialValues[key];
              } else if (
                (key == "office_id" ||
                  key == "category_id" ||
                  key == "period" ||
                  key == "cash_amount") &&
                value
              ) {
                values[key] = value.toString();
              } else if (key == "items" && Array.isArray(value)) {
                values["items"] = [];
                value.forEach((item) => {
                  values["items"].push({
                    item_id: item?.pivot?.item_id?.toString(),
                    quantity: item?.pivot?.quantity?.toString(),
                    unit: item?.pivot?.unit,
                  });
                });
              } else if (key == "start_date" && value) {
                setStartDate(getTimeValue(value.toString()));
              } else if (key == "end_date" && value) {
                setEndDate(getTimeValue(value.toString()));
              }
            }
          });
          form.setValues(values);
          setLoading(false);
        }
      })();
    }
  }, [editId, callApi, form, initialValues]);

  const steps = [
    {
      title: t("item_info"),
      icon: <BiSolidBox size={22} />,
      step: (
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <CharityPackageStepOne
            form={form}
            lng={lng}
            offices={offices}
            categories={categories}
            startDateErrorMessage={startDateErrorMessage}
            setStartDateErrorMessage={setStartDateErrorMessage}
            endDateErrorMessage={endDateErrorMessage}
            setEndDateErrorMessage={setEndDateErrorMessage}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            office={office}
          />
        </Box>
      ),
      async validate() {
        form.validate();
        if (!form.values.start_date) {
          setStartDateErrorMessage(t("field_required"));
        }
        if (!form.values.end_date) {
          setEndDateErrorMessage(t("field_required"));
        }
        let res =
          form.isValid("name") &&
          form.isValid("office_id") &&
          form.isValid("category_id") &&
          form.isValid("period") &&
          form.isValid("cash_amount") &&
          form.isValid("currency") &&
          form.values.start_date &&
          form.values.end_date;
        if (res) {
          let { response, status } = await callApi({
            method: "POST",
            url: "/charity_packages/check_uniqueness",
            data: {
              name: form.values.name,
              id: editId ? editId : null,
            },
          });
          if (status == 226) {
            form.setErrors({
              name: response.message == 0 && t("value_already_exists"),
            });
            return false;
          } else if (status !== 200) return false;
          return true;
        }
        return res;
      },
    },
    {
      title: t("items"),
      icon: <IoIosListBox size={22} />,
      step: <CharityPackageStepTwo form={form} lng={lng} items={items} />,
      async validate() {
        form.validate();
        let res = form.isValid("items");
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
      />
    </form>
  );
};

export default CharityPackageModal;
