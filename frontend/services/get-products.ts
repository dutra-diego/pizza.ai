import { api } from "@/lib/axios";
import type { Product } from "@/types/products";

export async function getProducts(): Promise<Product[]> {
	const response = await api.get("/products");
	return response.data;
}
