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
	baseURL: "http://localhost:7180",
});

export const secondaryApi = axios.create({
	baseURL: "http://localhost:8080",
});

addAuthInterceptor(api);
addAuthInterceptor(secondaryApi);
