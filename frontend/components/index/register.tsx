"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthModal } from "@/contexts/auth";
import { setAuthToken } from "@/lib/cookies";
import { registerService } from "@/services/register-service";
import { Button } from "../ui/button";

const registerSchema = z.object({
	name: z.string().min(3, "Digite seu nome completo"),
	email: z.email("Email inválido"),
	password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});
export function Register() {
	const { close } = useAuthModal();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});

	const {
		mutate: registerMutate,
		isPending,
		isError,
	} = useMutation({
		mutationFn: registerService,
		onSuccess: ({ token }) => {
			setAuthToken(token);
			close();
		},
	});

	const onSubmit = handleSubmit((data) => {
		registerMutate(data);
	});
	return (
		<div className="absolute top-0 right-1 md:right-6 z-50 dark:bg-slate-900 bg-slate-200 space-y-2 w-72 md:w-120 border flex items-center flex-col py-10 rounded-lg border-border">
			<div className="w-60 md:w-80">
				<h1 className="text-left text-2xl ">Faça seu cadastro</h1>
				<span className="text-sm text-accent-foreground/60">
					Cadastre-se para começar a usar o pizza.ai
				</span>
			</div>
			<form
				className="flex flex-col w-60 md:w-80 space-y-1"
				onSubmit={onSubmit}
			>
				<label htmlFor="name" className="text-lg">
					Nome
				</label>
				<input
					type="text"
					id="name"
					autoComplete="name"
					{...register("name")}
					className="rounded-lg  px-2 text-lg bg-primary-foreground  border-accent text-accent-foreground dark:text-secondary h-10"
					disabled={isPending}
				/>
				{errors.name && (
					<span className="text-sm text-red-500">{errors.name.message}</span>
				)}
				<label htmlFor="email" className="text-lg">
					Email
				</label>
				<input
					type="email"
					id="email"
					autoComplete="email"
					{...register("email")}
					className="rounded-lg  px-2 text-lg bg-primary-foreground  border-accent text-accent-foreground dark:text-secondary h-10"
					disabled={isPending}
				/>
				{errors.email && (
					<span className="text-sm text-red-500">{errors.email.message}</span>
				)}
				<label htmlFor="password" className="text-lg">
					Senha
				</label>
				<input
					type="password"
					id="password"
					autoComplete="new-password"
					{...register("password")}
					className="rounded-lg  px-2 text-lg bg-primary-foreground  border-accent text-accent-foreground dark:text-secondary h-10"
					disabled={isPending}
				/>
				{errors.password && (
					<span className="text-sm text-red-500">
						{errors.password.message}
					</span>
				)}
				{isError && (
					<p className="text-sm text-red-500 text-center pb-2">
						Ocorreu um erro inesperado
					</p>
				)}
				<div className="flex justify-between w-60 md:w-80 pt-2">
					<Button
						variant={"outline"}
						onClick={close}
						type="button"
						size="lg"
						disabled={isPending}
					>
						Retornar
					</Button>
					<Button size="lg" type="submit" disabled={isPending}>
						{isPending ? (
							<>
								<LoaderCircle className="animate-spin" size={20} />
								<span>Registrando...</span>
							</>
						) : (
							"Registrar"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
