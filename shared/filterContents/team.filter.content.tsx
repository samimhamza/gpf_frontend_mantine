export const TeamFilterContent = (t: (arg: string) => string) => {
  return [
    {
      title: "id_filtering",
      items: [
        {
          name: "name",
          label: t("name"),
          type: "checkbox",
          url: "/teams/auto_complete?model=Customer&id=",
          keyName: "name",
        },
      ],
    },
    {
      title: "data",
      items: [
        {
          name: "login.status",
          label: "Status",
          type: "checkbox",
          items: ["active", "inactive", "pending"],
        },
        {
          name: "customers.customer_status",
          label: "Customer Status",
          type: "checkbox",
          items: ["verified", "unverified", "pending verification"],
        },
        {
          name: "customers.gender",
          label: "Gender",
          type: "checkbox",
          items: ["male", "female"],
        },
        {
          name: "login.type",
          label: "Type",
          type: "checkbox",
          items: ["memeber", "seller"],
        },
      ],
    },
    {
      title: "date_range",
      items: [
        {
          name: "customers.created_at",
          label: "Created At",
          type: "date_range",
        },
        {
          name: "customers.updated_at",
          label: "Updated At",
          type: "date_range",
        },
      ],
    },
  ];
};
