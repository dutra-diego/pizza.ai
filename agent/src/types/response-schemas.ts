import { z } from "zod";

export const ErrorResponseSchema = z.object({
	message: z.string().describe("Error message"),
});

export const QrCodeResponseSchema = z.object({
	qrCode: z.string().describe("QR Code for WhatsApp authentication"),
});

export const SessionStatusResponseSchema = z.object({
	connected: z
		.boolean()
		.describe("Indicates if the user has an active session"),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type QrCodeResponse = z.infer<typeof QrCodeResponseSchema>;
export type SessionStatusResponse = z.infer<typeof SessionStatusResponseSchema>;
