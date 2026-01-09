import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Order } from "../../services/order-service";

export const getAvailableFlavors = createTool({
	id: "get-available-flavors",
	description: `Busca a lista de produtos e sabores disponíveis no sistema de pedidos de pizza.
		 caso seja a primeira interação do usuário, liste os produtos e disponiveis e CASO ele pergunte o que tem de sabores, liste os sabores disponíveis.`,
	outputSchema: z.object({
		products: z.array(
			z.object({
				id: z.string().describe("Product ID"),
				name: z.string().describe("Product name"),
				isAvailable: z.boolean().describe("Product availability"),
				flavors: z.array(
					z.object({
						id: z.string().describe("Flavor ID"),
						name: z.string().describe("Flavor name"),
						isAvailable: z.boolean().describe("Flavor availability"),
					}),
				),
			}),
		),
	}),
	execute: async ({ runtimeContext }) => {
		const token = runtimeContext.get("token") as string;
		const flavors = await Order.getProductsWithFlavors(token);
		return flavors;
	},
});
