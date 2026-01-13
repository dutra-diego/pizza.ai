import { api } from "@/lib/axios";
import type { CreateFlavor } from "@/types/flavors";

export async function createFlavor(data: CreateFlavor) {
	const result = await api.post("/flavors", data);
	return result.data;
}
