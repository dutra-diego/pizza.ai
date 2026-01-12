import { api } from "@/lib/axios";
import axios from "axios";

export interface IGetEnterprise {
	name: string;
	address: string;
	ordersLast7Days: number;
	ordersLast14Days: number;
	ordersLast30Days: number;
	totalRevenueLast30Days: number;
}

export async function GetEnterprise(): Promise<IGetEnterprise | null> {
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
