import axios from "axios";
import { useSession } from "next-auth/react";

axios.defaults.baseURL = process.env.API_BASE_URL;

export const useAxios = () => {
	const { data: session } = useSession();
	const api = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	if (session?.user.token) {
		api.defaults.headers.Authorization = "Bearer " + session.user.token;
	}
	api.defaults.headers["Content-Type"] = "application/json";

	const getApi = (url: string, params = {}) =>
		api
			.get(url, { params })
			.then((res) => res.data)
			.catch((err) => err.message);

	const postApi = (url: string, data = {}) =>
		api.post(url, data).then((res) => res.data);

	const postApiWithFile = (url: string, data = {}) =>
		api
			.post(url, data, {
				headers: {
					"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
				},
			})
			.then((res) => res.data);

	const putApi = (url: string, data = {}) =>
		api.put(url, data).then((res) => res.data);

	const putApiWithFile = (url: string, data = {}) =>
		api
			.put(url, data, {
				headers: {
					"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
				},
			})
			.then((res) => res.data);

	const deleteApi = async (url: string, ids: number[]) => {
		let status = null;
		let error = null;
		let data = null;
		try {
			const response = await api.delete(url, { params: { ids: ids } });
			status = response.status;
			data = response.data;
		} catch (err) {
			error = err;
		}
		return { data, status, error };
	};

	return {
		getApi,
		postApi,
		postApiWithFile,
		putApi,
		putApiWithFile,
		deleteApi,
	};
};
