import { api } from "@/lib/axios";

interface IUpdateFlavor {
	name?: string;
	price?: number;
	isAvailable?: boolean;
}

export async function UpdateFlavor(id: string, data: IUpdateFlavor) {
	const result = await api.patch(`/flavors/${id}`, data);
	return result.data;
}
