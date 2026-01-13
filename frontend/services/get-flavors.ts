import { api } from "@/lib/axios";
import type { Flavor } from "@/types/flavors";

export async function getFlavors(productId: string): Promise<Flavor[]> {
	const result = await api.get<Flavor[]>(`/flavors/${productId}`);
	return result.data;
}
