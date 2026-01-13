import { api } from "@/lib/axios";
import type { Order } from "@/types/orders";

export async function getOrders(): Promise<Order[]> {
	const result = await api.get("/orders");
	return result.data;
}
