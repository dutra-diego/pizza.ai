import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import { env } from "../../config/env";

export async function registerJwt(server: FastifyInstance) {
	await server.register(fastifyJwt, {
		secret: env.JWT_KEY,
		sign: { algorithm: "HS256" },
		verify: { algorithms: ["HS256"] },
	});
}
