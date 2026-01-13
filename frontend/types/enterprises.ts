export type Enterprise = {
	name: string;
	address: string;
	ordersLast7Days: number;
	ordersLast14Days: number;
	ordersLast30Days: number;
	totalRevenueLast30Days: number;
};

export type CreateEnterprise = {
	name: string;
	address: string;
};
