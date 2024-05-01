import { Dispatch, SetStateAction } from "react";
import { logColumns } from ".";
import { statusColum } from "./statusColum";
import { Center, Spoiler } from "@mantine/core";

export const SurveyPlansColumns = (
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
      accessor: "title",
      title: t("subject"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "province_name_fa",
      title: t("province"),
      noWrap: true,
      sortable: true,
    },

    {
      accessor: "district_name_fa",
      title: t("district"),
      noWrap: true,
      sortable: true,
    },
    {
      accessor: "description",
      title: t("description"),
      noWrap: true,
      sortable: true,
      render: ({ description }: { description: string }) => (
        <Spoiler
          maxHeight={25}
          showLabel={t("show_more")}
          hideLabel={t("hide")}
          transitionDuration={300}
        >
          <div
            style={{
              maxWidth: 300,
              minWidth: 200,
              maxHeight: 200,
              whiteSpace: "break-spaces",
              wordBreak: "break-all",
            }}
          >
            {description}
          </div>
        </Spoiler>
      ),
    },

    statusColum(t, statuses, statusUrl, showStatus, setMutated),
    ...logs,
  ];
};
