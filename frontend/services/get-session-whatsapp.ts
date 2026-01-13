import { secondaryApi } from "@/lib/axios";

interface ISessionWhatsAppResponse {
	connected: boolean;
}

export async function getSessionWhatsApp(): Promise<ISessionWhatsAppResponse> {
	const result = await secondaryApi.get("/sessions");
	return result.data;
}
