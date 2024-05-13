import { Grid } from "@mantine/core";
import { useTranslation } from "@/app/i18n/client";
import useOffice from "@/customHooks/useOffice";
import CustomAutoComplete from "./CustomAutoComplete";

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
  const { offices, office, setOffices } = useOffice();
  const { t } = useTranslation(lng);

  return (
    <Grid>
      <Grid.Col span={12} mb={10}>
        {office == "all" && (
          <CustomAutoComplete
            lng={lng}
            label={label}
            placeholder={label}
            data={offices}
            setData={setOffices}
            url={url}
            isSingle={false}
            {...{
              name: name,
              value: values,
              onChange: (value: any) => onChange(value),
            }}
          />
        )}
      </Grid.Col>
    </Grid>
  );
}
