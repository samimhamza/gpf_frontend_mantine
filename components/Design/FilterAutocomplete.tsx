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
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const callApi = useAxios();

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: url,
      });
      if (status == 200 && response.result == true) {
        setOffices(response.data);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callApi]);

  return (
    <Grid>
      <Grid.Col span={12} mb={10}>
        <Select
          name={name}
          label={label}
          value={values}
          placeholder={label}
          data={offices.map((office: any) => {
            return { value: office.id.toString(), label: office.name };
          })}
          searchable
          clearable
          rightSection={loading && <Loader color="primary" size={15} />}
          allowDeselect
          onChange={(value: any) => {
            onChange(value);
          }}
        />
      </Grid.Col>
    </Grid>
  );
}
