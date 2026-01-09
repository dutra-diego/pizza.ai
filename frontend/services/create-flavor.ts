import { api } from "@/lib/axios";

interface ICreateFlavor {
	productId: string;
	name: string;
	price: number;
	isAvailable: boolean;
}

export async function CreateFlavor(data: ICreateFlavor) {
	const result = await api.post("/flavors", data);
	return result.data;
}
