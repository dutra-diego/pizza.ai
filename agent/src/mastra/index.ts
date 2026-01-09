import { Mastra } from "@mastra/core/mastra";
import { PostgresStore } from "@mastra/pg";
import { env } from "../config/env";
import { recepcionistAssistant } from "./agents/recepcionist-assistant";

const dataBaseUrl = new PostgresStore({
	connectionString: env.DATABASE_URL_MASTRA,
});

export const mastra = new Mastra({
	agents: { recepcionistAssistant },
	storage: dataBaseUrl,
	telemetry: {
		enabled: false,
	},
});
