"use client";

import { useTranslation } from "@/app/i18n/client";
import SelectOffice from "./SelectOffice";
import CardWrapper from "../Auth/CardWrapper";

interface OfficeProps {
  lng: string;
}
const Office = ({ lng }: OfficeProps) => {
  const { t } = useTranslation(lng);

  return (
    <CardWrapper headerLabel={t("select_office")}>
      <SelectOffice lng={lng} redirect={true} />
    </CardWrapper>
  );
};

export default Office;
