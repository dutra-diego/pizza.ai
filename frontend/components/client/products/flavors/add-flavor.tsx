"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
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
import { CreateFlavor } from "@/services/create-flavor";
import type { Flavor } from "./columns-table";

const flavorSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
	isAvailable: z.boolean(),
});

type FormData = z.infer<typeof flavorSchema>;

type AddFlavorProps = {
	productId: string;
};

export function AddFlavor({ productId }: AddFlavorProps) {
	const [open, setOpen] = useState(false);
	const [priceDisplay, setPriceDisplay] = useState("");
	const queryClient = useQueryClient();

	const { register, handleSubmit, control, reset } = useForm<FormData>({
		resolver: zodResolver(flavorSchema),
		defaultValues: {
			name: "",
			price: 0,
			isAvailable: true,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData) =>
			CreateFlavor({
				productId,
				...data,
			}),
		onSuccess: (newFlavor, submittedData) => {
			const flavorToAdd: Flavor = {
				id: newFlavor?.id ?? crypto.randomUUID(),
				productId,
				name: submittedData.name,
				price: submittedData.price,
				isAvailable: submittedData.isAvailable,
				...newFlavor,
			};
			queryClient.setQueryData<Flavor[]>(["flavors", productId], (old) =>
				old ? [...old, flavorToAdd] : [flavorToAdd],
			);
			reset();
			setPriceDisplay("");
			setOpen(false);
		},
	});

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="icon-sm" variant="outline">
					<PlusIcon size={20} className="text-red-500" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Sabor</DialogTitle>
					<DialogDescription>
						Preencha as informações do novo sabor.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Nome
						</label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Nome do sabor"
						/>
					</div>
					<div className="space-y-2">
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
							{isPending ? "Salvando..." : "Adicionar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
