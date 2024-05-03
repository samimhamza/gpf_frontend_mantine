"use client";

import { useTranslation } from "@/app/i18n/client";
import { Modal } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import SelectOffice from "./SelectOffice";

interface OfficeModalProps {
  lng: string;
  opened: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const SelectOfficeModal = ({ lng, opened, close }: OfficeModalProps) => {
  const { t } = useTranslation(lng);

  return (
    <Modal
      opened={opened}
      onClose={() => close(false)}
      title={t("select_office")}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "pop" }}
      lockScroll={true}
      closeOnClickOutside={false}
    >
      <SelectOffice lng={lng} redirect={false} close={() => close(false)} />
    </Modal>
  );
};

export default SelectOfficeModal;
