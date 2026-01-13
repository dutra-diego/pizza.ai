import { api } from "@/lib/axios";

interface IRegisterData {
	name: string;
	email: string;
	password: string;
}

export async function registerService(
	data: IRegisterData,
): Promise<{ token: string }> {
	const result = await api.post("/client-users", data);
	return result.data;
}
