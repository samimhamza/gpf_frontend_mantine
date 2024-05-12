import React, { useState } from "react";
import { Box, Grid, Loader, MultiSelect } from "@mantine/core";
import { useTranslation } from "@/app/i18n/client";
import useOffice from "@/customHooks/useOffice";

interface FilterAutocompleteProps {
  url: string;
  label: string;
  name: string;
  keyName?: any;
  values: any;
  onChange: (event: string[]) => void;
  lng: string;
}

export default function FilterAutocomplete({
  url,
  label,
  name,
  keyName,
  values,
  onChange,
  lng,
}: FilterAutocompleteProps) {
  const { offices, office } = useOffice();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(lng);

  return (
    <Grid>
      <Grid.Col span={12} mb={10}>
        {office == "all" ? (
          <MultiSelect
            name={name}
            value={values}
            label={label}
            placeholder={label}
            data={offices}
            searchable
            clearable
            hidePickedOptions
            nothingFoundMessage={t("noting_found")}
            rightSection={loading && <Loader color="primary" size={15} />}
            size="sm"
            onChange={(value: any) => {
              onChange(value);
            }}
          />
        ) : (
          <Box style={{ flex: 1 }}></Box>
        )}
      </Grid.Col>
    </Grid>
  );
}
