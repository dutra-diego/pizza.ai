import { api } from "@/lib/axios";
import type { OrderStatus } from "@/types/orders";

export async function updateOrders(id: number, status: OrderStatus) {
	const result = await api.patch(`/orders/${id}`, { status });
	return result.data;
}
