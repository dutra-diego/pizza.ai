import "dotenv/config";
import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(8080),
	HOST: z.string().default("0.0.0.0"),
	DATABASE_URL_PRISMA: z.string().min(1, "DATABASE_URL_PRISMA is required"),
	DATABASE_URL_MASTRA: z.string().min(1, "DATABASE_URL_MASTRA is required"),
	CORS_ORIGIN: z.string().default("http://localhost:3000"),
	JWT_KEY: z.string().min(1, "JWT_KEY is required"),
});

export const env = envSchema.parse(process.env);
