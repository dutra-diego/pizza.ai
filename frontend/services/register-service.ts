import { api } from "@/lib/axios";

interface IRegisterData {
	name: string;
	email: string;
	password: string;
}

export async function RegisterService(
	data: IRegisterData,
): Promise<{ token: string }> {
	const result = await api.post("/client-users", data);
	return result.data;
}
