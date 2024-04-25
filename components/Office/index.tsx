"use client";

import { useTranslation } from "@/app/i18n/client";
import CardWrapper from "../auth/CardWrapper";
import SelectOffice from "./SelectOffice";

interface OfficeProps {
  lng: string;
}
const Office = ({ lng }: OfficeProps) => {
  const { t } = useTranslation(lng);

  return (
    <CardWrapper headerLabel={t("select_office")}>
      <SelectOffice lng={lng} />
    </CardWrapper>
  );
};

export default Office;
