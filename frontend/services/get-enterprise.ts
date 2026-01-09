import { api } from "@/lib/axios";

export interface IGetEnterprise {
	name: string;
	address: string;
	ordersLast7Days: number;
	ordersLast14Days: number;
	ordersLast30Days: number;
	totalRevenueLast30Days: number;
}

export async function GetEnterprise(): Promise<IGetEnterprise | null> {
	const response = await api.get("/enterprises");
	return response.data;
}
