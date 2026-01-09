"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { EditFlavor } from "./edit-flavor";

export type Flavor = {
	id: string;
	productId: string;
	name: string;
	price: number;
	isAvailable: boolean;
};

export const flavorColumns: ColumnDef<Flavor>[] = [
	{
		accessorKey: "name",
		header: "Nome",
		meta: { className: "text-left min-w-[120px]" },
	},
	{
		accessorKey: "price",
		header: "Preço",
		meta: { className: "text-center whitespace-nowrap" },
		cell: ({ row }) => {
			const value = (row.getValue("price") as number) ?? 0;
			return <span>R$ {value.toFixed(2)}</span>;
		},
	},
	{
		accessorKey: "isAvailable",
		header: "Disponível",
		meta: { className: "text-center whitespace-nowrap" },
		cell: ({ row }) => {
			const isAvailable = row.getValue("isAvailable") as boolean;
			return (
				<span className={isAvailable ? "text-green-500" : "text-red-500"}>
					{isAvailable ? "Sim" : "Não"}
				</span>
			);
		},
	},
	{
		id: "edit",
		header: "Editar",
		meta: { className: "text-center w-16" },
		cell: ({ row }) => {
			const flavor = row.original;
			return <EditFlavor flavor={flavor} />;
		},
	},
];
