import { secondaryApi } from "@/lib/axios";

interface StartSessionResponse {
	qrCode: string;
}

export interface IStartSessionWhatsApp {
	qr: string | null;
}

export async function StartSessionWhatsApp(): Promise<IStartSessionWhatsApp> {
	const result = await secondaryApi.post<StartSessionResponse>("/sessions", {
		botId: "recepcionistAssistant",
	});
	return {
		qr: result.status === 201 ? result.data.qrCode : null,
	};
}
