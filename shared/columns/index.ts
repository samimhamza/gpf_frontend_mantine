import { getDateTime } from "@/shared/functions";

export const logColumns = (t: (arg: string) => string) => {
  return [
    {
      accessor: "created_at",
      title: t("created_at"),
      noWrap: true,
      sortable: true,
      render: ({ created_at }: { created_at: string }) =>
        created_at ? getDateTime(created_at) : "",
    },
    {
      accessor: "created_by",
      title: t("created_by"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "updated_at",
      title: t("updated_at"),
      noWrap: true,
      sortable: true,
      render: ({ updated_at }: { updated_at: string }) =>
        updated_at ? getDateTime(updated_at) : "",
    },
    {
      accessor: "updated_by",
      title: t("updated_by"),
      noWrap: true,
      sortable: true,
    },
  ];
};

export const applicantStatuses = (t: (arg: string) => string) => [
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
  {
    status: "rejected",
    color: "red",
    text: t("rejected"),
  },
];

export const sharedStatuses = (t: (arg: string) => string) => [
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


export const priorities = (t: (arg: string) => string) => [
  {
    status: "high",
    color: "red",
    text: t("high"),
  },
  {
    status: "medium",
    color: "gray",
    text: t("medium"),
  },
  {
    status: "low",
    color: "yellow",
    text: t("low"),
  },
];
export const applicantRequestStatuses = (t: (arg: string) => string) => [
  {
    status: "approved",
    color: "green",
    text: t("approved"),
  },
  {
    status: "rejected",
    color: "red",
    text: t("rejected"),
  },
  {
    status: "pending",
    color: "yellow",
    text: t("pending"),
  },
];
