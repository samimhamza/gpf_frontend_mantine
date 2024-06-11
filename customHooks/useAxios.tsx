'use client';

import { useCallback } from 'react';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { readLocalStorageValue } from '@mantine/hooks';
import toast from 'react-hot-toast';

export const useAxios: any = () => {
	const router = useRouter();
	const office = readLocalStorageValue({ key: 'office' });
	const { data: session } = useSession();

	const callAPI = useCallback(
		async ({ method, url, params, data, headers }: any) => {
			let response = null;
			let loading = false;
			let error = null;
			let status = 404;
			const api = axios.create({
				baseURL: process.env.NEXT_PUBLIC_BASE_URL,
			});
			let defaultHeaders = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...headers,
				Authorization: `Bearer ${session?.user.token}`,
			};

			try {
				loading = true;
				const rawResponse = await api.request({
					method,
					url,
					params: {
						...params,
						office: office ? office : session?.user.office_id,
					},
					headers: {
						...defaultHeaders,
						headers,
					},
					data,
				});

				status = rawResponse.status;
				response = rawResponse.data;

				if (rawResponse.status == 401) {
					await signOut({
						redirect: false,
					});
					router.push('/auth/login');
					return;
				}
			} catch (err: any) {		
				if (err.response.status) status = err.response.status;
				error = err;
				if (status == 422) {
					const errors = error?.response?.data?.errors;

					for (const field in errors) {
						if (Object.hasOwnProperty.call(errors, field)) {
							const errorMessages: [string] = errors[field];							
							errorMessages.forEach((errorMessage: string) => {
								console.log(`- ${errorMessage}`);
								toast.error(errorMessage);
							});
						}
					}
				}
			} finally {
				loading = false;
			}

			return { response, status, error, loading };
		},
		[]
	);
	return callAPI;
};
