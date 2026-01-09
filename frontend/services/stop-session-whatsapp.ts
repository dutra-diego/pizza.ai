import { secondaryApi } from "@/lib/axios";

export async function StopSessionWhatsApp() {
	const result = await secondaryApi.delete("/sessions");
	return result.data;
}
