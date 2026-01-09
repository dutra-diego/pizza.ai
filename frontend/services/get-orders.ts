import type { Order } from "@/components/client/orders/columns-table";
import { api } from "@/lib/axios";

export async function GetOrders(): Promise<Order[]> {
	const result = await api.get("/orders");
	return result.data;
}
