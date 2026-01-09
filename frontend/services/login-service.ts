import { api } from "@/lib/axios";

interface ILoginData {
	email: string;
	password: string;
}

export async function LoginService(
	data: ILoginData,
): Promise<{ token: string }> {
	const result = await api.post("/client-users/login", data);
	return result.data;
}
