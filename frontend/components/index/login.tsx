"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthModal } from "@/contexts/auth";
import { setAuthToken } from "@/lib/cookies";
import { LoginService } from "@/services/login-service";
import { Button } from "../ui/button";

const loginSchema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});
export function Login() {
	const { close } = useAuthModal();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});
	const {
		mutate: loginMutate,
		isPending,
		isError,
	} = useMutation({
		mutationFn: LoginService,
		onSuccess: ({ token }) => {
			setAuthToken(token);
			close();
			router.push("/client");
		},
	});
	const onSubmit = handleSubmit((data) => {
		loginMutate(data);
	});

	return (
		<div className="absolute top-0 right-1 md:right-6 z-50 dark:bg-slate-900 bg-slate-200 space-y-2 w-72 md:w-120 border flex items-center flex-col py-10 rounded-lg border-border">
			<div className="w-60 md:w-80">
				<h1 className="text-left text-2xl ">Iniciar Sessão</h1>
				<span className="text-sm text-accent-foreground/60">
					Faça login para começar a usar o pizza.ai
				</span>
			</div>
			<form
				className="flex flex-col  w-60 md:w-80 space-y-1"
				onSubmit={onSubmit}
			>
				<label htmlFor="Email" className="text-lg">
					Email
				</label>
				<input
					type="email"
					id="Email"
					autoComplete="email"
					{...register("email")}
					className="rounded-lg  px-2 text-md bg-primary-foreground  border-accent text-accent-foreground dark:text-secondary h-10"
				/>
				{errors.email && (
					<span className="text-sm text-red-500">{errors.email.message}</span>
				)}
				<label htmlFor="Password" className="text-lg">
					Senha
				</label>
				<input
					type="password"
					id="Password"
					autoComplete="current-password"
					{...register("password")}
					className="rounded-lg  px-2 text-lg bg-primary-foreground  border-accent text-accent-foreground dark:text-secondary h-10"
				/>
				{errors.password && (
					<span className="text-sm text-red-500">
						{errors.password.message}
					</span>
				)}
				<div className="flex flex-col w-60 md:w-80 space-y-1">
					<Link href="/register">
						<span className="text-sm text-primary/60 hover:text-primary">
							Esqueceu sua senha?
						</span>
					</Link>
					{isError && (
						<p className="text-sm text-red-500 text-center pb-2">Ocorreu um erro inesperado</p>
					)}
					<div className="flex justify-between w-60 md:w-80">
						<Button
							variant="outline"
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
									<span>Entrando...</span>
								</>
							) : (
								"Entrar"
							)}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
