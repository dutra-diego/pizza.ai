import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { extractBearerToken, extractUserId } from "../../lib/auth";
import {
	activeSessions,
	startSessionService,
} from "../../services/start-session-service";
import type { JwtType } from "../../types/jwtSchema";
import {
	ErrorResponseSchema,
	QrCodeResponseSchema,
	SessionStatusResponseSchema,
} from "../../types/response-schemas";
import { StartSessionSchema } from "../../types/start-session";
import {
	ConflictError,
	NotFoundError,
	UnauthorizedError,
} from "../plugins/error";

export const whatsappRoutes: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/sessions",
		{
			schema: {
				summary: "Start WhatsApp session",
				description:
					"Starts a new WhatsApp session for the authenticated user. Returns a QR Code for authentication in the app.",
				tags: ["WhatsApp"],
				security: [{ bearerAuth: [] }],
				body: StartSessionSchema,
				response: {
					201: QrCodeResponseSchema.describe(
						"QR Code successfully generated for authentication",
					),
					204: z
						.null()
						.describe("Session already authenticated, no QR Code needed"),
					401: ErrorResponseSchema.describe("Invalid token or expired session"),
					409: ErrorResponseSchema.describe(
						"An active session already exists for this user",
					),
				},
			},
		},
		async (request, reply) => {
			const payload = await request.jwtVerify<JwtType>();
			const userId = extractUserId(payload);
			const { botId } = request.body;
			const token = extractBearerToken(request.headers.authorization);

			if (!token) {
				throw new UnauthorizedError("Bearer token required");
			}

			const result = await startSessionService(userId, botId, token);

			if (result.message === "WhatsApp session closed. Please login again.") {
				throw new UnauthorizedError(result.message);
			}

			if (result.message === "Session already exists") {
				throw new ConflictError(result.message);
			}

			if (!result.qr) {
				return reply.status(204).send();
			}

			return reply.status(201).send({ qrCode: result.qr });
		},
	);

	server.delete(
		"/sessions",
		{
			schema: {
				summary: "End WhatsApp session",
				description:
					"Ends the active WhatsApp session for the authenticated user. The user will need to scan the QR Code again to reconnect.",
				tags: ["WhatsApp"],
				security: [{ bearerAuth: [] }],
				response: {
					204: z.null().describe("Session ended successfully"),
					401: ErrorResponseSchema.describe("Invalid token or expired session"),
					404: ErrorResponseSchema.describe(
						"No active session found for this user",
					),
				},
			},
		},
		async (request, reply) => {
			const payload = await request.jwtVerify<JwtType>();
			const userId = extractUserId(payload);
			const session = activeSessions.get(userId);

			if (!session) {
				throw new NotFoundError("Session not found");
			}

			await session.socket.logout();
			activeSessions.delete(userId);

			return reply.status(204).send();
		},
	);

	server.get(
		"/sessions",
		{
			schema: {
				summary: "Check session status",
				description:
					"Checks if there is an active WhatsApp session for the authenticated user.",
				tags: ["WhatsApp"],
				security: [{ bearerAuth: [] }],
				response: {
					200: SessionStatusResponseSchema.describe(
						"Session status returned successfully",
					),
					401: ErrorResponseSchema.describe("Invalid token or expired session"),
				},
			},
		},
		async (request, reply) => {
			const payload = await request.jwtVerify<JwtType>();
			const userId = extractUserId(payload);
			const connected = activeSessions.has(userId);

			return reply.status(200).send({ connected });
		},
	);
};
