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
	config.headers.Accept = "application/json";
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
export { getApi };
