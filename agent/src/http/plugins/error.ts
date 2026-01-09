export class AppError extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
	) {
		super(message);
		this.name = "AppError";
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401);
		this.name = "UnauthorizedError";
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
		this.name = "NotFoundError";
	}
}

export class ConflictError extends AppError {
	constructor(message = "Resource already exists") {
		super(message, 409);
		this.name = "ConflictError";
	}
}
