export const UserFilterContent = (t: (arg: string) => string) => {
  return [
    {
      title: t("id_filtering"),
      items: [
        {
          name: "users.office_id",
          label: t("office"),
          type: "autocomplete",
          url: "/all_offices",
          keyName: "name",
        },
      ],
    },
    {
      title: t("data_filtering"),
      items: [
        // {
        //   name: "age",
        //   label: t("age"),
        //   type: "data",
        //   subType: "numberRange",
        // },
        {
          name: "users.full_name",
          label: t("full_name"),
          type: "data",
          subType: "textInput",
          keyName: "name",
        },
        {
          name: "users.username",
          label: t("username"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "users.created_by",
          label: t("created_by"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "users.updated_by",
          label: t("updated_by"),
          type: "data",
          subType: "textInput",
          url: "/teams/",
          keyName: "name",
        },
        {
          name: "users.status",
          label: t("status"),
          type: "data",
          subType: "checkbox",
          items: [
            { value: "active", text: t("active") },
            { value: "inactive", text: t("inactive") },
            { value: "pending", text: t("pending") },
          ],
        },
        // {
        //   name: "gender",
        //   label: t("gender"),
        //   type: "data",
        //   subType: "checkbox",
        //   items: [
        //     { value: "male", text: t("male") },
        //     { value: "female", text: t("female") },
        //   ],
        // },
      ],
    },
    {
      title: t("date_range_filtering"),
      items: [
        {
          name: "users.created_at",
          label: t("created_at"),
          type: "date_range",
        },
        {
          name: "users.updated_at",
          label: t("updated_at"),
          type: "date_range",
        },
      ],
    },
  ];
};
