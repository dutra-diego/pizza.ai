import { api } from "@/lib/axios";
import type { UpdateFlavor } from "@/types/flavors";

export async function updateFlavor(id: string, data: UpdateFlavor) {
	const result = await api.patch(`/flavors/${id}`, data);
	return result.data;
}
