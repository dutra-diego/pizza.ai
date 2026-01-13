import { secondaryApi } from "@/lib/axios";

export async function stopSessionWhatsApp() {
	const result = await secondaryApi.delete("/sessions");
	return result.data;
}
