import https from "node:https";
import axios, { type AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
	baseURL: "https://localhost:7180",
	timeout: 5000,
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
});

