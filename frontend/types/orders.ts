export type OrderStatus =
	| "Em produção"
	| "Saiu para entrega"
	| "Concluido"
	| "Cancelado";

export type Flavor = {
	id: string;
	name: string;
};

export type OrderProduct = {
	id: string;
	productId: string;
	productName: string;
	size: string;
	quantity: number;
	priceAtTime: number;
	sizeMultiplier: number;
	pricePerItem: number;
	totalPrice: number;
	flavors: Flavor[];
};

export type Order = {
	id: number;
	name: string;
	phone: string;
	deliveryAddress: string;
	createdAt: string;
	orderTotal: number;
	status: OrderStatus;
	products: OrderProduct[];
};
