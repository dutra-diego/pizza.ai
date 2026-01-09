import { api } from "@/lib/axios";

interface ICreateProduct {
	name: string;
	category: string;
	price: number;
	available: boolean;
}

export async function CreateProduct(data: ICreateProduct) {
	const response = await api.post("/products", data);
	return response.data;
}
