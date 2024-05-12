export const UserFilterContent = (t: (arg: string) => string) => {
  return [
    {
      title: t("id_filtering"),
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
      title: t("data_filtering"),
      items: [
        {
          name: "age",
          label: t("age"),
          type: "data",
          subType: "numberRange",
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
        {
          name: "statuses",
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
          name: "created_at",
          label: t("created_at"),
          type: "date_range",
        },
        {
          name: "updated_at",
          label: t("updated_at"),
          type: "date_range",
        },
      ],
    },
  ];
};
