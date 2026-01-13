import { api } from "@/lib/axios";
import type { CreateEnterprise } from "@/types/enterprises";

export async function createEnterprise(data: CreateEnterprise) {
	const response = await api.post("/enterprises", data);
	return response.data;
}
