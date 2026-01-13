import axios from "axios";
import { api } from "@/lib/axios";
import type { Enterprise } from "@/types/enterprises";

export async function getEnterprise(): Promise<Enterprise | null> {
	try {
		const response = await api.get("/enterprises");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
}
