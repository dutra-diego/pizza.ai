export type Flavor = {
	id: string;
	productId: string;
	name: string;
	price: number;
	isAvailable: boolean;
};

export type CreateFlavor = {
	productId: string;
	name: string;
	price: number;
	isAvailable: boolean;
};

export type UpdateFlavor = {
	name?: string;
	price?: number;
	isAvailable?: boolean;
};
