import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantImplementsSchema } from "@/schemas/models/applicant_implements";
import { getTimeValue, getTime } from "@/shared/functions";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Fieldset,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import moment from "jalali-moment";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Value } from "react-multi-date-picker";
import PackageInfo from "./PackageInfo";

interface ImplementModalProps {
  applicantId: number | undefined;
  officeId: number;
  opened: boolean;
  close: () => void;
  lng: string;
  setMutated: Dispatch<SetStateAction<boolean>>;
  title: string;
  editId: number | undefined;
  mutate: any;
}

const ImplementModal = ({
  applicantId,
  officeId,
  opened,
  close,
  lng,
  setMutated,
  title,
  editId,
  mutate,
}: ImplementModalProps) => {
  const { t } = useTranslation(lng);
  const theme = useMantineTheme();
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const callApi = useAxios();
  const implementsSchema = ApplicantImplementsSchema(t);
  const [warehouses, setWarehouses] = useState([]);
  const [applicantPackage, setApplicantPackage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [implementDateErrorMessage, setImplementDateErrorMessage] =
    useState("");
  const [implementDate, setImplementDate] = useState<Value>();
  const [editWarehouse, setEditWarehouse] = useState<string>();

  const initialValues: any = useMemo(() => {
    return {
      applicant_survey_id: "",
      warehouse_id: "",
      implement_date: null,
      description: "",
    };
  }, []);

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(implementsSchema),
    validateInputOnBlur: true,
  });

  const checkAvailability = async () => {
    const { response, status } = await callApi({
      method: "POST",
      url: "/charity_packages/checkAvailability",
      data: {
        warehouse_id: form.values?.warehouse_id,
        charity_package_id: applicantPackage?.charity_package?.id,
      },
    });
    if (status == 200 && response.result) {
      return true;
    } else if (status == 226) {
      toast.error(t("not_found_in_warehouse"));
      close();
      return false;
    }
    toast.error(t("something_went_wrong"));
    return false;
  };

  const validate = async () => {
    form.validate();
    let isDateValid = true;
    if (!form.values.implement_date) {
      setImplementDateErrorMessage(t("field_required"));
      isDateValid = false;
    }
    if (form.isValid() && isDateValid) {
      if (editId && editWarehouse != form.values.warehouse_id) {
        return checkAvailability();
      } else if (editId) {
        return true;
      }
      if (!editId) {
        return checkAvailability();
      }
    }
    return false;
  };

  const submit = async () => {
    setSubmitLoading(true);
    if (await validate()) {
      const { response, status } = !editId
        ? await callApi({
            method: "POST",
            url: "/applicant_package_implements",
            data: form.values,
          })
        : await callApi({
            method: "PUT",
            url: `/applicant_package_implements/${editId}`,
            data: form.values,
          });
      if ((!editId ? status == 201 : status == 202) && response.result) {
        await mutate();
        setMutated(true);
        close();
      } else if (status == 422) {
        toast.error(t("editing_not_allowed"));
        close();
      } else {
        toast.error(t("something_went_wrong"));
      }
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: `/all_warehouses?office_id=${officeId}`,
      });
      if (status == 200 && response.result == true) {
        setWarehouses(
          response.data.map((item: any) => {
            return { value: item.id.toString(), label: item.name };
          })
        );
      }
    })();
  }, [callApi, officeId]);

  const getCurrentApplicantPackage = useCallback(async () => {
    setLoading(true);
    const { response, status, error } = await callApi({
      method: "GET",
      url: `/applicant_current_package/${applicantId}`,
    });
    if (status == 200 && response.result == true) {
      setApplicantPackage(response.data);
      form.setFieldValue("applicant_survey_id", response.data.id);
    }
    setLoading(false);
  }, [callApi, form, applicantId]);

  const getApplicantPackage = useCallback(async () => {
    setLoading(true);
    const { response, status, error } = await callApi({
      method: "GET",
      url: `/applicant_package_implements/${editId}`,
    });
    if (status == 200 && response.result == true) {
      let values: any = {};
      Object.entries(response.data).forEach(([key, value]) => {
        if (Object.keys(initialValues).includes(key)) {
          if (
            key != "warehouse_id" &&
            key != "applicant_survey_id" &&
            key != "implement_date"
          ) {
            values[key] = value ? value : initialValues[key];
          } else if (key == "warehouse_id" && value) {
            values[key] = value.toString();
            setEditWarehouse(value.toString());
          } else if (key == "implement_date" && value) {
            setImplementDate(getTimeValue(value.toString()));
          }
        }
      });
      setApplicantPackage(response?.data?.applicant_survey);
      form.setFieldValue(
        "applicant_survey_id",
        response.data.applicant_survey.id
      );
      form.setValues(values);
      setLoading(false);
    }
  }, [callApi, form, editId, initialValues]);

  useEffect(() => {
    (async function () {
      if (!editId) {
        getCurrentApplicantPackage();
      } else {
        getApplicantPackage();
      }
    })();
  }, [editId, getCurrentApplicantPackage, getApplicantPackage]);

  useEffect(() => {
    if (implementDate) {
      setImplementDateErrorMessage("");
      form.setFieldValue("implement_date", getTime(implementDate));
    } else {
      form.setFieldValue("implement_date", null);
    }
  }, [implementDate, form]);

  const endDateValue = moment(applicantPackage?.charity_package?.end_date)
    .endOf("day")
    .valueOf();

  const currentDateValue = moment().endOf("day").valueOf();

  return (
    <>
      <form>
        <Modal
          opened={opened}
          centered
          size={mdMatches ? "65%" : smMatches ? "80%" : "100%"}
          className="custom-modal"
          withCloseButton={false}
          onClose={close}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          transitionProps={{ transition: "pop" }}
          lockScroll={true}
          closeOnClickOutside={false}
        >
          <Group justify="space-between" className="modal-header" p="xs">
            <Title order={4}>{title}</Title>
            <CloseButton
              className="close-btn"
              aria-label="Close modal"
              onClick={close}
            />
          </Group>
          <ScrollArea h={380} p="sm">
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="sm"
              p="sm"
              justify={{ sm: "center" }}
            >
              <Select
                style={{ flex: 1 }}
                label={t("warehouse")}
                placeholder={t("warehouse")}
                data={warehouses}
                withAsterisk
                searchable
                clearable
                nothingFoundMessage={t("noting_found")}
                {...form.getInputProps("warehouse_id")}
              />
              <PersianDatePicker
                label={t("implement_date")}
                placeholder={t("implement_date")}
                value={implementDate}
                onChange={setImplementDate}
                errorMessage={implementDateErrorMessage}
                dateTime
                maxDate={
                  endDateValue > currentDateValue
                    ? currentDateValue
                    : endDateValue
                }
              />
            </Flex>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="sm"
              p="sm"
              justify={{ sm: "center" }}
            >
              <Textarea
                resize="vertical"
                style={{ flex: 1 }}
                label={t("description")}
                placeholder={t("description")}
                {...form.getInputProps("description")}
              />
            </Flex>
            <PackageInfo
              lng={lng}
              category={applicantPackage?.category}
              charityPackage={applicantPackage?.charity_package}
            />
          </ScrollArea>
          <Group justify="flex-end" p="sm" className="modal-footer">
            <Button
              rightSection={
                <MdSend
                  style={{
                    transform: "rotate(-180deg)",
                  }}
                />
              }
              type="submit"
              onClick={submit}
              loading={submitLoading}
            >
              {t("submit")}
            </Button>
          </Group>
        </Modal>
      </form>
      <style jsx global>{`
        .custom-modal .mantine-Modal-body {
          padding: 0;
        }
        .custom-modal .modal-header {
          border-bottom: 1px solid var(--mantine-color-gray-4);
        }
        .custom-modal .modal-footer {
          border-top: 1px solid var(--mantine-color-gray-4);
        }
        .border {
          border: 1px solid var(--mantine-color-gray-4);
        }
      `}</style>
    </>
  );
};

export default ImplementModal;
