"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Loader, Select } from "@mantine/core";
import { useEffect, useState } from "react";

const CustomAutoComplete = ({
  lng,
  label,
  placeholder,
  data,
  setData,
  url,
  columnName,
  ...props
}: {
  lng: string;
  label: string;
  placeholder: string;
  data: any[];
  setData: (data: any[]) => void;
  url: string;
  columnName: string;
  props: any;
}) => {
  const { t } = useTranslation(lng);
  const callApi = useAxios();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let index = data.findIndex((item) => item.label == searchValue);
    if (index == -1) {
      (async () => {
        setLoading(true);
        const { response, status } = await callApi({
          method: "GET",
          url: url,
          params: {
            [columnName]: searchValue,
          },
        });
        if (status == 200 && response.result == true) {
          setData(
            response.data.map((item: any) => {
              return {
                value: item.id.toString(),
                label: item.name + " (" + item.code + ")",
              };
            })
          );
        }
        setLoading(false);
      })();
    }
  }, [searchValue]);

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      clearable
      nothingFoundMessage={t("noting_found")}
      rightSection={loading && <Loader size={15} />}
      {...props}
    />
  );
};

export default CustomAutoComplete;
