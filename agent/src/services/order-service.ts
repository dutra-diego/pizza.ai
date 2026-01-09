import { api } from "../lib/axios";
import type { CreateOrderType } from "../types/create-order";

export const Order = {
	async create(token: string, orderData: CreateOrderType) {
		const result = await api.post("/orders", orderData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	},

	async get(token: string, phone: string) {
		const result = await api.get(`/orders/${phone}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return result.data;
	},
	async getProductsWithFlavors(token: string) {
		const result = await api.get(`/products/flavors`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return result.data;
	},
};
