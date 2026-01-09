import { api } from "@/lib/axios";

interface ICreateEnterprise {
	name: string;
	address: string;
}

export async function CreateEnterprise(data: ICreateEnterprise) {
	const response = await api.post("/enterprises", data);
	return response.data;
}
