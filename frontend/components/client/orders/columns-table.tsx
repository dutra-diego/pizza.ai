"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const columns: ColumnDef<Order>[] = [
	{
		id: "details",
		header: "",
		size: 20,
		maxSize: 20,
		cell: ({ row, table }) => {
			const order = row.original;
			const meta = table.options.meta as
				| { onDetails?: (order: Order) => void }
				| undefined;

			return (
				<Button
					variant="ghost"
					size="sm"
					className="text-xs"
					onClick={() => meta?.onDetails?.(order)}
				>
					<NotebookText />
				</Button>
			);
		},
	},
	{
		accessorKey: "id",
		header: "Ordem",
		size: 60,
		minSize: 60,
		meta: { className: "text-center" },
	},

	{
		accessorKey: "name",
		header: "Nome",
		size: 140,
		minSize: 140,
		meta: { className: "text-left" },
	},
	{
		accessorKey: "deliveryAddress",
		header: "Endereço",
		size: 400,
		minSize: 400,
		meta: { className: "text-left" },
	},
	{
		accessorKey: "orderTotal",
		header: "Valor",
		meta: { className: "text-center" },
		size: 70,
		minSize: 70,
		cell: ({ row }) => {
			const value = row.getValue("orderTotal") as number;
			return <span>R$ {value.toFixed(2)}</span>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		meta: { className: "text-left" },
		maxSize: 120,
		minSize: 120,
	},

	{
		id: "actions",
		header: "Ações",
		meta: { className: "text-center" },
		size: 80,
		minSize: 80,
		cell: ({ row, table }) => {
			const order = row.original;
			const meta = table.options.meta as
				| { onAdvance?: (id: number) => void }
				| undefined;

			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() => meta?.onAdvance?.(order.id)}
					disabled={
						order.status === "Concluido" || order.status === "Cancelado"
					}
				>
					Avançar
				</Button>
			);
		},
	},
	{
		id: "cancel",
		header: "",
		meta: { className: "text-center" },
		size: 80,
		minSize: 80,
		cell: ({ row, table }) => {
			const order = row.original;
			const meta = table.options.meta as
				| { onCancel?: (id: number) => void }
				| undefined;

			return (
				<Button
					variant="ghost"
					size="sm"
					className="text-destructive hover:text-destructive hover:bg-destructive/10"
					onClick={() => meta?.onCancel?.(order.id)}
					disabled={
						order.status === "Concluido" || order.status === "Cancelado"
					}
				>
					Cancelar
				</Button>
			);
		},
	},
];
