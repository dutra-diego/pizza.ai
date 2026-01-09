import { api } from "@/lib/axios";

interface IProduct {
	id: string;
	name: string;
	price: number;
	available: boolean;
}
export async function GetProducts(): Promise<IProduct[]> {
	const response = await api.get("/products");
	return response.data;
}
