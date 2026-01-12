import axios, { type AxiosInstance } from "axios";
import { getAuthToken } from "./cookies";

function addAuthInterceptor(instance: AxiosInstance) {
	instance.interceptors.request.use((config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_FIRST_API,
});

export const secondaryApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SECONDARY_API,
});

addAuthInterceptor(api);
addAuthInterceptor(secondaryApi);
