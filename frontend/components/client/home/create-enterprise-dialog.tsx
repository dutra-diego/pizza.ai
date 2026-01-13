import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createEnterprise } from "@/services/create-enterprises";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

const enterpriseSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	address: z.string().min(1, "Endereço é obrigatório"),
});

export function CreateEnterpriseDialog() {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof enterpriseSchema>>({
		resolver: zodResolver(enterpriseSchema),
		defaultValues: {
			name: "",
			address: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: createEnterprise,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["enterprise"],
			});
		},
	});

	const onSubmit = (data: z.infer<typeof enterpriseSchema>) => {
		mutate(data);
	};
	return (
		<Dialog open={true}>
			<DialogContent className="[&>button]:hidden">
				<DialogHeader>
					<DialogTitle>Cadastrar Empresa</DialogTitle>
					<DialogDescription>
						Você ainda não possui uma empresa cadastrada. Preencha os dados
						abaixo para continuar.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex flex-col space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Nome da Empresa
						</label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Nome da empresa"
						/>
						{errors.name && (
							<p className="text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<label htmlFor="address" className="text-sm font-medium">
							Endereço
						</label>
						<Input
							id="address"
							{...register("address")}
							placeholder="Endereço da empresa"
						/>
						{errors.address && (
							<p className="text-sm text-red-500">{errors.address.message}</p>
						)}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<>
									<LoaderCircle className="animate-spin" size={20} />
									Registrando...
								</>
							) : (
								"Cadastrar"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
