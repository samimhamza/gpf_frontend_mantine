"use client";

import { readLocalStorageValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

const useOffice = (form?: any) => {
  const [offices, setOffices] = useState([]);
  const office: string | null = readLocalStorageValue({ key: "office" });
  const callApi = useAxios();

  useEffect(() => {
    if (office == "all") {
      (async function () {
        const { response, status, error } = await callApi({
          method: "GET",
          url: "/office/auto_complete",
        });
        if (status == 200 && response.result == true) {
          setOffices(
            response.data.map((item: any) => {
              return {
                value: item.id.toString(),
                label: item.name + " (" + item.code + ")",
              };
            })
          );
        }
      })();
    } else if (office) {
      form && form.setValues({ office_id: office?.toString() });
    }
  }, [office, callApi]);

  return { offices, office, setOffices };
};

export default useOffice;
