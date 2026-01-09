import fastifyCors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { env } from "../../config/env";

export async function registerCors(server: FastifyInstance) {
	await server.register(fastifyCors, {
		origin: env.CORS_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		credentials: true,
	});
}
