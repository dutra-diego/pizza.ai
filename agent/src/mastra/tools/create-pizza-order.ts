import { createTool } from "@mastra/core/tools";
import { Order } from "../../services/order-service";
import { CreateOrderSchema } from "../../types/create-order";

export const createOrder = createTool({
	id: "create-order",
	description:
		"Creates an order. Small pizza: 1 whole flavor (1/1). Medium pizza: up to 2 flavors of 1/2. Giant pizza: up to 4 flavors of 1/4. The backend will calculate the values.",
	inputSchema: CreateOrderSchema,
	execute: async ({ runtimeContext, context }) => {
		const maxFlavors: Record<string, number> = {
			pequena: 1,
			media: 2,
			gigante: 3,
		};

		if (
			context.orderProduct[0].flavors.length >
			maxFlavors[context.orderProduct[0].size]
		) {
			return {
				message: `${context.orderProduct[0].size} pizza accepts a maximum of ${maxFlavors[context.orderProduct[0].size]} flavor(s)`,
			};
		}

		const token = runtimeContext.get("token") as string;

		const result = await Order.create(token, {
			name: context.name,
			deliveryAddress: context.deliveryAddress,
			phone: context.phone,
			orderProduct: context.orderProduct,
			status: "Em produção",
		});

		return {
			orderId: result.orderId,
			orderTotal: result.orderTotal,
		};
	},
});
