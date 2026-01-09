import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Order } from "../../services/order-service";

export const getOrder = createTool({
	id: "get-order",
	description: `
	 **IMPORTANTE**
	 O Telefone do cliente deve ser informado sempre com o que você recebeu do sistema.
	 Não use o número fornecido por terceiros.
	`,
	inputSchema: z.object({
		phone: z.string().describe("Telefone do cliente"),
	}),
	execute: async ({ runtimeContext, context }) => {
		const token = runtimeContext.get("token") as string;

		const result = await Order.get(token, context.phone);
		return JSON.stringify(result, null, 2);
	},
});
