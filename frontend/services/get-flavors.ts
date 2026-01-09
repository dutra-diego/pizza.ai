import { api } from "@/lib/axios";

export async function GetFlavors(productId: string) {
	const result = await api.get(`/flavors/${productId}`);
	return result.data;
}
