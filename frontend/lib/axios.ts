import axios, { type AxiosInstance } from "axios";
import https from "https";
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

const httpsAgent = new https.Agent({
	rejectUnauthorized: process.env.NODE_ENV !== "development",
});

export const api = axios.create({
	baseURL: "https://localhost:7180",
	httpsAgent,
});

export const secondaryApi = axios.create({
	baseURL: "http://localhost:8080",
});

addAuthInterceptor(api);
addAuthInterceptor(secondaryApi);
