export const UserFilterContent = (t: (arg: string) => string) => {
  return [
    {
      title: "id_filtering",
      items: [
        {
          name: "office_code",
          label: t("office"),
          type: "autocomplete",
          url: "/all_offices",
          keyName: "name",
        },
      ],
    },
    {
      title: "data",
      items: [
        {
          name: "statuses",
          label: "Status",
          type: "data",
          subType: "checkbox",
          items: ["active", "inactive", "pending"],
        },
        {
          name: "gender",
          label: "Gender",
          type: "data",
          subType: "checkbox",
          items: ["male", "female"],
        },
        {
          name: "full_name",
          label: t("full_name"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "username",
          label: t("username"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "created_by",
          label: t("created_by"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "updated_by",
          label: t("updated_by"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
      ],
    },
    {
      title: "date_range",
      items: [
        {
          name: "created_at",
          label: "Created At",
          type: "date_range",
        },
        {
          name: "updated_at",
          label: "Updated At",
          type: "date_range",
        },
      ],
    },
  ];
};
