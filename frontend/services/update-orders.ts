import { api } from "@/lib/axios";

export async function UpdateOrders(id: number, status: string) {
	const result = await api.patch(`/orders/${id}`, { status });
	return result.data;
}
