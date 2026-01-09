import { api } from "@/lib/axios";

interface IUpdateProduct {
	name?: string;
	price?: number;
	isAvailable?: boolean;
}

export async function UpdateProducts(id: string, data: IUpdateProduct) {
	const result = api.patch(`/products/${id}`, data);
	return result;
}
