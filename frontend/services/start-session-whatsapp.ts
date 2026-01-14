import { secondaryApi } from "@/lib/axios";
import type { StartSessionWhatsApp } from "@/types/sessions";

type StartSessionResponse = {
	qrCode: string;
};

export async function startSessionWhatsApp(): Promise<StartSessionWhatsApp> {
	const result = await secondaryApi.post<StartSessionResponse>("/sessions", {
		botId: "recepcionistAssistant",
	});
	if (result.status === 204) {
		return { qr: null };
	}
	return {
		qr: result.data.qrCode ?? null,
	};
}
