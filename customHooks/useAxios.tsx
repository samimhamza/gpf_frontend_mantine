"use client";

import { useCallback } from "react";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAxios: any = ({ method, headers }: any) => {
	const router = useRouter();
	const callAPI = useCallback(async ({ url, params, data }: any) => {
		let response = null;
		let loading = false;
		let error = null;
		let status = 404;
		const token = await getSession().then((session) => session?.user.token);

		const api = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BASE_URL,
		});
		let defaultHeaders = {
			Accept: "application/json",
			"Content-Type": "application/json",
			...headers,
			Authorization: `Bearer ${token}`,
		};

		try {
			loading = true;
			const rawResponse = await api.request({
				method,
				url,
				params,
				headers: {
					...defaultHeaders,
					headers,
				},
				data,
			});
			status = rawResponse.status;
			response = rawResponse.data;
			if (rawResponse.status == 401) {
				signOut({
					redirect: false,
				});
				router.push("/auth/login");
				return;
			}
		} catch (err: any) {
			error = err;
		} finally {
			loading = false;
		}
		return { response, status, error, loading };
	}, []);
	return callAPI;
};
