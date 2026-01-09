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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreateProduct } from "@/services/create-product";

const productSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	category: z.enum(["Alimento", "Bebida"]),
	price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
	available: z.boolean(),
});

type FormData = z.infer<typeof productSchema>;

type Product = {
	id: string;
	name: string;
	category: string;
	price: number;
	available: boolean;
};

export function AddProduct() {
	const [open, setOpen] = useState(false);
	const [priceDisplay, setPriceDisplay] = useState("");
	const queryClient = useQueryClient();

	const { register, handleSubmit, control, reset } = useForm<FormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			category: undefined,
			price: 0,
			available: true,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData) => CreateProduct(data),
		onSuccess: (newProduct, submittedData) => {
			const productToAdd: Product = {
				id: newProduct?.id ?? crypto.randomUUID(),
				name: submittedData.name,
				category: submittedData.category,
				price: submittedData.price,
				available: submittedData.available,
				...newProduct,
			};
			queryClient.setQueryData<Product[]>(["products"], (old) =>
				old ? [...old, productToAdd] : [productToAdd],
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
					<DialogTitle>Adicionar Produto</DialogTitle>
					<DialogDescription>
						Preencha as informações do novo produto.
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
							placeholder="Nome do produto"
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="category" className="text-sm font-medium">
							Categoria
						</label>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione uma categoria" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Alimento">Alimento</SelectItem>
										<SelectItem value="Bebida">Bebida</SelectItem>
									</SelectContent>
								</Select>
							)}
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
							name="available"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="available"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<label
							htmlFor="available"
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
