"use server";

import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

// create an axios instance with default configuration
const api = axios.create({
	baseURL: process.env.API_BASE_URL,
	// timeout: 5000,
	// withCredentials: true,
});

// request interceptor to add authentication token
api.interceptors.request.use(async (config) => {
	const data = await getServerSession(authOptions);
	if (data?.user.token) {
		config.headers.Authorization = `Bearer ${data.user.token}`;
	}
	config.headers["Content-Type"] = "application/json";
	return config;
});

// response interceptor to handle errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// server responded with a status code outside the range of 2xx
			const { data, status } = error.response;
			console.error(
				`Request failed with status ${status}. Error message: ${data.message}`
			);
		} else if (error.request) {
			// request made but no response received
			console.error("No response received from the server.");
		} else {
			// error occurred while setting up the request
			console.error(`Error message: ${error.message}`);
		}
		return Promise.reject(error);
	}
);

const getApi = (url: string, params = {}) =>
	api.get(url, { params }).then((res) => res.data);

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
// // API methods for making GET and POST requests
// const getApi = async (url: string, params: any = {}) => {
// 	let response = null;
// 	let loading = false;
// 	let status = 404;
// 	let error = null;
// 	try {
// 		loading = true;
// 		const res = await api.get(url, params);
// 		loading = false;
// 		if (res.status == 200) {
// 			response = res.data;
// 		}
// 		status = res.status;
// 	} catch (err) {
// 		loading = false;
// 		error = err;
// 	}
// 	return { response, loading, status, error };
// };

// const postApi = async (url: string, data: Object = {}) => {
// 	let response = null;
// 	let loading = false;
// 	let status = 404;
// 	let error = null;
// 	try {
// 		loading = true;
// 		const res = await api.post(url, data);
// 		loading = false;
// 		if (res.status == 201) {
// 			response = res.data;
// 		}
// 		status = res.status;
// 	} catch (err) {
// 		loading = false;
// 		error = err;
// 	}
// 	return { response, loading, status, error };
// };

// const postWithFileApi = async (url: string, data: any) => {
// 	try {
// 		const response = await api.post(url, data, {
// 			headers: {
// 				"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
// 			},
// 		});
// 		return response.data;
// 	} catch (error) {
// 		return Promise.reject(error);
// 	}
// };

// const putApi = async (url: string, data: any) => {
// 	try {
// 		const response = await api.put(url, data);
// 		return response.data;
// 	} catch (error) {
// 		return Promise.reject(error);
// 	}
// };

// const putWithFileApi = async (url: string, data: any) => {
// 	try {
// 		const response = await api.put(url, JSON.stringify(data), {
// 			headers: {
// 				// 'accept': "*/*",
// 				"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
// 			},
// 		});
// 		return response.data;
// 	} catch (error) {
// 		return Promise.reject(error);
// 	}
// };

export { getApi, postApi, postApiWithFile, putApi, putApiWithFile, deleteApi };
