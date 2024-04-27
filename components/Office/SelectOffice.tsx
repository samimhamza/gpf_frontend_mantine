"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { Button, LoadingOverlay, ScrollArea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie] = useCookies(["office", "office_name"]);
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
  }, []);

  const setOffice = (office: any) => {
    setCookie("office", office?.id ? office?.id : office);
    setCookie(
      "office_name",
      office?.name ? office?.name + " (" + office?.code + ")" : office
    );
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
          <Button variant="light" fullWidth onClick={() => setOffice("all")}>
            {t("all_offices")}
          </Button>
          {offices.map((office: any) => (
            <Button
              mt="sm"
              variant="light"
              fullWidth
              onClick={() => setOffice(office)}
            >
              {t("office")} : {office.name + " (" + office.code + ")"}
            </Button>
          ))}
        </>
      ) : (
        <Button variant="light" fullWidth onClick={() => setOffice("all")}>
          {t("no_office_exists")}
        </Button>
      )}
    </ScrollArea>
  );
};

export default SelectOffice;
