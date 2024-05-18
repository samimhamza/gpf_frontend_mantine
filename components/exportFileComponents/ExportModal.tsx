"use client";
import { useTranslation } from "@/app/i18n/client";
import CustomModal from "@/components/CustomModal";
import { useAxios } from "@/customHooks/useAxios";
import { ExportFileSchema } from "@/schemas/models/exportFile";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserShield } from "react-icons/fa";
import ExportStepOne from "./ExportStepOne";
import { handleDownloadExcel } from "./excel/ExportExcel";
import { handleDownloadPDF } from "./pdf/ExportPDF";

const dataMock = [
  {
    id: 490,
    full_name: "مرحبًا",
    email: "soledad.mccullough@example.org",
    status: "pending",
    username: "pearlie56",
    profile: "",
    office_id: 4,
    office_code: "SNS",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "yost.edmond",
    updated_at: "2024-05-17T11:32:29.000000Z",
    updated_by: "superadmin",
  },
  {
    id: 491,
    full_name: "Amir Hayes",
    email: "ekohler@example.org",
    status: "active",
    username: "breanne.goldner",
    profile: "",
    office_id: 1,
    office_code: "ZDN",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "rtrantow",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "rtrantow",
  },
  {
    id: 492,
    full_name: "Alford Feest",
    email: "mervin.glover@example.org",
    status: "pending",
    username: "dprohaska",
    profile: "",
    office_id: 4,
    office_code: "SNS",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "rudolph.cormier",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "rudolph.cormier",
  },
  {
    id: 493,
    full_name: "Tyler Stoltenberg",
    email: "willie.langosh@example.net",
    status: "pending",
    username: "qwilliamson",
    profile: "",
    office_id: 5,
    office_code: "NLZ",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "cummings.mikel",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "cummings.mikel",
  },
  {
    id: 494,
    full_name: "Lesley Spencer",
    email: "rau.gordon@example.com",
    status: "active",
    username: "chanelle30",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "gleichner.mia",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "gleichner.mia",
  },
  {
    id: 495,
    full_name: "Charlie Okuneva",
    email: "pdickens@example.org",
    status: "pending",
    username: "tturner",
    profile: "",
    office_id: 1,
    office_code: "ZDN",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "krista.franecki",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "krista.franecki",
  },
  {
    id: 496,
    full_name: "Jovani Hane",
    email: "kamille.gottlieb@example.org",
    status: "pending",
    username: "qmaggio",
    profile: "",
    office_id: 3,
    office_code: "KHT",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "nmclaughlin",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "nmclaughlin",
  },
  {
    id: 497,
    full_name: "Alverta Brekke",
    email: "thirthe@example.com",
    status: "active",
    username: "zoey42",
    profile: "",
    office_id: 3,
    office_code: "KHT",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "imante",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "imante",
  },
  {
    id: 498,
    full_name: "Trenton Weissnat",
    email: "vcasper@example.org",
    status: "pending",
    username: "kstracke",
    profile: "",
    office_id: 4,
    office_code: "SNS",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "goodwin.leo",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "goodwin.leo",
  },
  {
    id: 499,
    full_name: "Lora Kutch",
    email: "bosco.lelia@example.com",
    status: "active",
    username: "hmiller",
    profile: "",
    office_id: 5,
    office_code: "NLZ",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "nakia37",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "nakia37",
  },
  {
    id: 500,
    full_name: "Sage West",
    email: "hazel41@example.com",
    status: "active",
    username: "rosanna60",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "kautzer.marlin",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "kautzer.marlin",
  },
  {
    id: 501,
    full_name: "Kathleen Wisoky",
    email: "devin37@example.org",
    status: "pending",
    username: "yboyle",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "ndenesik",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "ndenesik",
  },
  {
    id: 502,
    full_name: "Gaylord Fritsch",
    email: "niko32@example.net",
    status: "pending",
    username: "edison.moore",
    profile: "",
    office_id: 4,
    office_code: "SNS",
    created_at: "2024-05-07T20:12:30.000000Z",
    created_by: "wstokes",
    updated_at: "2024-05-07T20:12:30.000000Z",
    updated_by: "wstokes",
  },
  {
    id: 359,
    full_name: "Caleb Howe",
    email: "uzieme@example.com",
    status: "pending",
    username: "antonette01",
    profile: "",
    office_id: 1,
    office_code: "ZDN",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "berniece12",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "berniece12",
  },
  {
    id: 360,
    full_name: "Simone Towne",
    email: "cartwright.adrienne@example.org",
    status: "inactive",
    username: "willy.schroeder",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "toney93",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "toney93",
  },
  {
    id: 361,
    full_name: "Brian Kohler",
    email: "uwill@example.net",
    status: "inactive",
    username: "sheila.oberbrunner",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "feeney.loren",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "feeney.loren",
  },
  {
    id: 362,
    full_name: "Braeden Ritchie",
    email: "wtromp@example.com",
    status: "inactive",
    username: "jwatsica",
    profile: "",
    office_id: 5,
    office_code: "NLZ",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "dortha.lynch",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "dortha.lynch",
  },
  {
    id: 363,
    full_name: "Dovie Schaefer",
    email: "mireya16@example.com",
    status: "pending",
    username: "litzy.kutch",
    profile: "",
    office_id: 2,
    office_code: "PQZ",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "jwatsica",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "jwatsica",
  },
  {
    id: 364,
    full_name: "Fredy Jerde",
    email: "nedra.bernier@example.net",
    status: "inactive",
    username: "flavio.mcglynn",
    profile: "",
    office_id: 4,
    office_code: "SNS",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "sunny.kunze",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "sunny.kunze",
  },
  {
    id: 365,
    full_name: "Judge Gusikowski",
    email: "kbreitenberg@example.org",
    status: "pending",
    username: "zemlak.emerson",
    profile: "",
    office_id: 1,
    office_code: "ZDN",
    created_at: "2024-05-07T20:12:29.000000Z",
    created_by: "estrella.lindgren",
    updated_at: "2024-05-07T20:12:29.000000Z",
    updated_by: "estrella.lindgren",
  },
];

const ExportModal = ({
  anotherOpened,
  anotherClose,
  lng,
  setMutated,
  title,
  editId,
  exportTitle,
}: {
  anotherOpened: boolean;
  anotherClose: () => void;
  lng: string;
  setMutated: any;
  title: string;
  exportTitle: string;
  editId: number | undefined;
}) => {
  const { t } = useTranslation(lng);
  const exportFileSchema = ExportFileSchema(t);
  const [loading, setLoading] = useState(false);
  const callApi = useAxios();

  const initialValues = {
    downloadType: "",
    downloadSize: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(exportFileSchema),
    validateInputOnBlur: true,
  });

  const { downloadSize, downloadType } = form.values;
  const types = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "excel" },
  ];
  const sizes = [
    { label: "Current Page Data", value: "current" },
    { label: "Current Filter Data", value: "filtered" },
    { label: "All Data", value: "all" },
  ];

  const steps = [
    {
      title: t("references_info"),
      icon: <FaUserShield size={22} />,
      step: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <ExportStepOne form={form} lng={lng} types={types} sizes={sizes} />
        </Box>
      ),

      async validate() {
        form.validate();
        let res = form.isValid();
        return res;
      },
    },
  ];

  const handleSubmit = async () => {
    if (downloadType == "pdf") {
      if (downloadSize == "current") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng, exportTitle);
          return true;
        }
      } else if (downloadSize == "filtered") {
        // ! TODO LATER
      } else if (downloadSize == "all") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
          params: { per_page: -1 },
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadPDF(data, lng, exportTitle);
          return true;
        }
      }
    } else if (downloadType == "excel") {
      if (downloadSize == "current") {
        const { response, status } = await callApi({
          method: "GET",
          url: "/users",
        });
        if (status == 200 && response.result) {
          const data = response.data;
          await setMutated(true);
          handleDownloadExcel(dataMock);
          return true;
        }
      }
    }

    toast.error(t("something_went_wrong"));
    return false;
  };

  return (
    <form>
      <CustomModal
        opened={anotherOpened}
        close={anotherClose}
        steps={steps}
        form={form}
        submit={handleSubmit}
        lng={lng}
        title={title}
        editId={editId}
        width='40%'
      />
    </form>
  );
};

export default ExportModal;
