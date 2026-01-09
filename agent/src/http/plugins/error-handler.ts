import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./error";

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	request.log.error(error);
	return reply.status(500).send({
		message: "Internal server error",
	});
}
