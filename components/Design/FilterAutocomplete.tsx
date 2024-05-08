import React, { useEffect, useState } from "react";
import { Grid, Loader, MultiSelect, Select } from "@mantine/core";
import { useAxios } from "@/customHooks/useAxios";

interface FilterAutocompleteProps {
  url: string;
  label: string;
  name: string;
  keyName?: any;
  values: any;
  onChange: (event: string[]) => void;
}

export default function FilterAutocomplete({
  url,
  label,
  name,
  keyName,
  values,
  onChange,
}: FilterAutocompleteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const callApi = useAxios();

  const merge = (a: any[], b: any[], p: string) =>
    a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b);

  async function getData(
    url: string,
    content: {},
    loading: {
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (arg0: boolean): void;
    },
    setData: {
      (value: React.SetStateAction<never[]>): void;
      (value: React.SetStateAction<never[]>): void;
      (arg0: (state: any) => any): void;
    },
    options: any[]
  ) {
    try {
      loading(true);
      const res = await callApi(url, { params: content });
      if (res.status === 200 && res.data.result) {
        setData((state) =>
          options ? merge(options, res.data.data, "id") : res.data.data
        );
        console.log(options, res.data.data);
      }
      loading(false);
    } catch (error) {
      loading(false);
    }
  }

  const searchItems = (content: {
    [x: string]: React.SetStateAction<string>;
  }) => {
    setInput(content[keyName]);
    getData(url, content, setIsLoading, setOptions, options);
  };

  useEffect(() => {
    values.length > 0
      ? getData(
          url + encodeURIComponent(values),
          {},
          setIsLoading,
          setOptions,
          options
        )
      : null;
  }, []);

  return (
    <Grid>
      <Grid.Col span={12} mb={10}>
        <Select
          name={name}
          label={label}
          placeholder={label}
          data={options}
          searchable
          clearable
          rightSection={isLoading && <Loader color="primary" size={15} />}
          value={values ?? []}
          onChange={(value: any) => {
            onChange(value);
            setInput("");
          }}
        />
      </Grid.Col>
    </Grid>
  );
}
