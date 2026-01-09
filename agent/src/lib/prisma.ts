import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client";

const connection = process.env.DATABASE_URL_PRISMA;

const prismaPg = new PrismaPg({
	connectionString: connection,
});

export const prisma = new PrismaClient({
	adapter: prismaPg,
});
