"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Loader, MultiSelect, Select } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CustomAutoComplete = ({
  lng,
  label,
  placeholder,
  data,
  setData,
  url,
  values,
  isSingle = true,
  ...props
}: {
  lng: string;
  label: string;
  placeholder: string;
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
  url: string;
  values?: string[] | string | null;
  isSingle?: boolean;
  props?: any;
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
            content: searchValue,
            id: values ? values : null,
          },
        });
        if (status == 200 && response.result == true) {
          if (setData) {
            setData(
              response.data.map((item: any) => {
                return {
                  value: item.id.toString(),
                  label: item.name + " (" + item.code + ")",
                };
              })
            );
          }
        }
        setLoading(false);
      })();
    }
  }, [searchValue, values]);

  return isSingle ? (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      clearable
      nothingFoundMessage={loading ? <Loader m="sm" /> : t("noting_found")}
      rightSection={loading && <Loader size={15} />}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 100 },
      }}
      {...props}
    />
  ) : (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      data={data}
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      clearable
      nothingFoundMessage={loading ? <Loader m="sm" /> : t("noting_found")}
      rightSection={loading && <Loader size={15} />}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 100 },
      }}
      {...props}
    />
  );
};

export default CustomAutoComplete;
