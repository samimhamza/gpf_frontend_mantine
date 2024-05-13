"use client";

import { readLocalStorageValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";
import { ListType } from "@/types/list";

const useOffice = (form?: any) => {
  const [offices, setOffices] = useState<ListType[]>([]);
  const office: string | null = readLocalStorageValue({ key: "office" });
  const callApi = useAxios();

  useEffect(() => {
    if (office != "all") {
      form && form.setValues({ office_id: office?.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office, callApi]);

  return { offices, office, setOffices };
};

export default useOffice;
