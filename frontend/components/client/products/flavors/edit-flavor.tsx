"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UpdateFlavor } from "@/services/update-flavor";
import type { Flavor } from "./columns-table";

const flavorSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
	isAvailable: z.boolean(),
});

type FormData = z.infer<typeof flavorSchema>;

type EditFlavorProps = {
	flavor: Flavor;
};

export function EditFlavor({ flavor }: EditFlavorProps) {
	const [open, setOpen] = useState(false);
	const [priceDisplay, setPriceDisplay] = useState(
		(flavor.price ?? 0).toFixed(2),
	);
	const queryClient = useQueryClient();

	const { register, handleSubmit, control } = useForm<FormData>({
		resolver: zodResolver(flavorSchema),
		defaultValues: {
			name: flavor.name ?? "",
			price: flavor.price ?? 0,
			isAvailable: flavor.isAvailable ?? true,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: Partial<FormData>) => UpdateFlavor(flavor.id, data),
		onSuccess: (_, updatedData) => {
			queryClient.setQueryData<Flavor[]>(["flavors", flavor.productId], (old) =>
				old?.map((f) => (f.id === flavor.id ? { ...f, ...updatedData } : f)),
			);
			setOpen(false);
		},
	});

	const onSubmit = (data: FormData) => {
		const changedFields: Partial<FormData> = {};

		if (data.name !== flavor.name) {
			changedFields.name = data.name;
		}
		if (data.price !== flavor.price) {
			changedFields.price = parseFloat(data.price.toFixed(2));
		}
		if (data.isAvailable !== flavor.isAvailable) {
			changedFields.isAvailable = data.isAvailable;
		}

		if (Object.keys(changedFields).length > 0) {
			mutate(changedFields);
		} else {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<Pencil size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Sabor</DialogTitle>
					<DialogDescription>
						Atualize as informações do sabor abaixo.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex flex-col space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Nome
						</label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Nome do sabor"
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="price" className="text-sm font-medium">
							Preço
						</label>
						<Controller
							name="price"
							control={control}
							render={({ field }) => (
								<Input
									id="price"
									type="text"
									inputMode="decimal"
									value={priceDisplay}
									onChange={(e) => {
										const value = e.target.value.replace(/[^0-9.,]/g, "");
										setPriceDisplay(value);
										field.onChange(parseFloat(value.replace(",", ".")) || 0);
									}}
									onBlur={() => {
										const num = parseFloat(priceDisplay.replace(",", ".")) || 0;
										const formatted = num.toFixed(2);
										setPriceDisplay(formatted);
										field.onChange(parseFloat(formatted));
									}}
									placeholder="0.00"
								/>
							)}
						/>
					</div>
					<div className="flex items-center gap-2 px-1">
						<Controller
							name="isAvailable"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="isAvailable"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<label
							htmlFor="isAvailable"
							className="text-sm font-medium cursor-pointer"
						>
							Disponível
						</label>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Salvando..." : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
