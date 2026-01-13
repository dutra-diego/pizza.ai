import { api } from "@/lib/axios";
import type { UpdateProduct } from "@/types/products";

export async function updateProducts(id: string, data: UpdateProduct) {
	const result = api.patch(`/products/${id}`, data);
	return result;
}
