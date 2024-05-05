'use client';

import { readLocalStorageValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

const useUsers = (form?: any) => {
  const [users, setUsers] = useState([]);
  // ! TODO LATER -----------------------------------
  const user: string | null = readLocalStorageValue({ key: 'office' }) || 'all';
  const callApi = useAxios();

  useEffect(() => {
    if (user == 'all') {
      (async function () {
        const { response, status, error } = await callApi({
          method: 'GET',
          url: '/users',
          params: { per_page: 1000 }, // ! TODO Later -------------
        });

        if (status == 200 && response.result == true) {
          setUsers(
            response.data.map((item: any) => {
              return {
                value: item.id.toString(),
                label: `${item.id}-${item.full_name}`,
              };
            })
          );
        }
      })();
    } else if (user) {
      form && form.setValues({ user_id: user?.toString() });
    }
  }, [user, callApi]);

  return { users, user };
};

export default useUsers;
