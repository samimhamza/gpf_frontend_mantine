"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Button, LoadingOverlay, ScrollArea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SelectOffice = ({
  lng,
  redirect = true,
  close,
}: {
  lng: string;
  redirect?: boolean;
  close?: () => void;
}) => {
  const { t } = useTranslation(lng);
  const [offices, setOffices] = useState([]);
  const callApi = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const { response, status, error } = await callApi({
        method: "GET",
        url: "/all_offices",
      });
      if (status == 200 && response.result == true) {
        setOffices(response.data);
      }
      setLoading(false);
    })();
  }, [callApi]);

  const setOfficeValue = (office: any) => {
    localStorage.setItem("office", office?.id ? office?.id.toString() : office);
    if (redirect) {
      router.push("/dashboard");
    }
    if (close) {
      close();
    }
  };
  return (
    <ScrollArea h={250} pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={10000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {offices.length ? (
        <>
          <Button
            variant="light"
            fullWidth
            onClick={() => setOfficeValue("all")}
          >
            {t("all_offices")}
          </Button>
          {offices.map((office: any, index) => (
            <Button
              key={index}
              mt="sm"
              variant="light"
              fullWidth
              onClick={() => setOfficeValue(office)}
            >
              {t("office")} : {office.name + " (" + office.code + ")"}
            </Button>
          ))}
        </>
      ) : (
        <Button variant="light" fullWidth onClick={() => setOfficeValue("all")}>
          {t("no_office_exists")}
        </Button>
      )}
    </ScrollArea>
  );
};

export default SelectOffice;
