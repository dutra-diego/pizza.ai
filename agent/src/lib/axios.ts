import axios, { type AxiosInstance } from "axios";
import { env } from "../config/env";

export const api: AxiosInstance = axios.create({
	baseURL: env.BACKEND_URL,
	timeout: 5000,
});

