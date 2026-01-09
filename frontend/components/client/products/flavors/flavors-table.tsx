"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Flavor } from "./columns-table";

interface FlavorsTableProps {
	columns: ColumnDef<Flavor>[];
	data: Flavor[];
}

export function FlavorsTable({ columns, data }: FlavorsTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-x-auto rounded-md border">
			<Table className="min-w-full">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const metaClassName = (
									header.column.columnDef.meta as
										| { className?: string }
										| undefined
								)?.className;
								return (
									<TableHead
										key={header.id}
										style={{ width: header.getSize() }}
										className={metaClassName}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => {
									const metaClassName = (
										cell.column.columnDef.meta as
											| { className?: string }
											| undefined
									)?.className;
									return (
										<TableCell
											key={cell.id}
											style={{ width: cell.column.getSize() }}
											className={metaClassName}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Nenhum sabor encontrado.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
