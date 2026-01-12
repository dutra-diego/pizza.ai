import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "../config/env";
import { registerCors } from "./plugins/cors";
import { errorHandler } from "./plugins/error-handler";
import { registerJwt } from "./plugins/jwt";
import { registerSwagger } from "./plugins/swagger";
import { whatsappRoutes } from "./routes/whatsapp";

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler(errorHandler);

async function start() {
	await registerSwagger(server);
	await registerCors(server);
	await registerJwt(server);
	await server.register(whatsappRoutes);
	await server.listen({ port: env.PORT, host: env.HOST }).then(() => {
		console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
	});
}

start().catch((err) => {
	console.error("Error starting server:", err);
	process.exit(1);
});
