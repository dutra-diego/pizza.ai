export type Product = {
	id: string;
	name: string;
	category: string;
	price: number;
	available: boolean;
};
export type CreateProduct = {
	name: string;
	category: string;
	price: number;
	available: boolean;
};

export type UpdateProduct = {
	name?: string;
	price?: number;
	isAvailable?: boolean;
};
