import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";
import { Center } from "@mantine/core";

export const TeamColumns = (
  t: (arg: string) => string,
  showStatus: boolean,
  statusUrl: string,
  setMutated: Dispatch<SetStateAction<boolean>>
) => {
  const logs = logColumns(t);

  const statuses = [
    {
      status: "active",
      color: "green",
      text: t("active"),
    },
    {
      status: "inactive",
      color: "gray",
      text: t("inactive"),
    },
    {
      status: "pending",
      color: "yellow",
      text: t("pending"),
    },
  ];

  return [
    {
      accessor: "id",
      title: t("id"),
      noWrap: true,
      sortable: true,
      render: ({ id }: { id: number }) => <Center>{id}</Center>,
    },
    {
      accessor: "name",
      title: t("name"),
      noWrap: true,
      sortable: true,
    },
    statusColum(t, statuses, statusUrl, showStatus, setMutated),
    ...logs,
  ];
};

// export const filterContent = [
//   {
//     title: "id_filtering",
//     items: [
//       {
//         name: "name",
//         label: t("name"),
//         type: "autocomplete",
//         url: "/codes/auto_complete?model=Customer&id=",
//         keyName: "str_code",
//       },
//     ],
//   },
// {
//   title: "data",
//   items: [
//     {
//       name: "login.status",
//       label: "Status",
//       type: "checkbox",
//       items: ["active", "inactive", "pending"],
//     },
//     {
//       name: "customers.customer_status",
//       label: "Customer Status",
//       type: "checkbox",
//       items: ["verified", "unverified", "pending verification"],
//     },
//     {
//       name: "customers.gender",
//       label: "Gender",
//       type: "checkbox",
//       items: ["male", "female"],
//     },
//     {
//       name: "login.type",
//       label: "Type",
//       type: "checkbox",
//       items: ["memeber", "seller"],
//     },
//   ],
// },
// {
//   title: "date_range",
//   items: [
//     {
//       name: "customers.created_at",
//       label: "Created At",
//       type: "date_range",
//     },
//     {
//       name: "customers.updated_at",
//       label: "Updated At",
//       type: "date_range",
//     },
//   ],
// },
// ];
