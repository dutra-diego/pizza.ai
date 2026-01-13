import { z } from "zod";

export const CreateOrderSchema = z.object({
	name: z.string().min(1).describe("Customer name"),
	deliveryAddress: z.string().min(1).describe("Delivery address"),
	phone: z.string().min(8).describe("Customer phone number"),
	orderProduct: z
		.array(
			z.object({
				productId: z.uuid().describe("Product ID (pizza)"),
				size: z.string().min(1).describe("Product size"),
				flavors: z
					.array(
						z.object({
							flavorId: z.uuid().describe("Flavor ID"),
							sliceCount: z.number().int().min(0).describe("Number of slices"),
						}),
					)
					.min(1)
					.describe("List of pizza flavors"),
				quantity: z.number().int().min(1).describe("Number of pizzas"),
			}),
		)
		.min(1)
		.describe("List of order products"),
	status: z.string().default("Em produção").describe("Order status"),
});

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;
