import { api } from "@/lib/axios";
import type { CreateProduct, Product } from "@/types/products";

export async function createProduct(data: CreateProduct): Promise<Product> {
	const response = await api.post("/products", data);
	return response.data;
}
