import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export async function registerSwagger(server: FastifyInstance) {
	await server.register(fastifySwagger, {
		openapi: {
			openapi: "3.1.0",
			info: {
				title: "Multi-Agent WhatsApp API",
				description: "API for managing multiple WhatsApp bots",
				version: "1.0.0",
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
						description: "Enter the JWT token received from WhatsApp start",
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	});

	await server.register(fastifySwaggerUi, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "full",
			deepLinking: false,
		},
		theme: {
			css: [
				{
					filename: "theme.css",
					content:
						".topbar { display: none } .info .main .link { display: none }",
				},
			],
		},
	});
}
