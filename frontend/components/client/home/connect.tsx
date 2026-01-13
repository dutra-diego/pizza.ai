"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, BotOff, Loader2 } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { getSessionWhatsApp } from "@/services/get-session-whatsapp";
import { startSessionWhatsApp } from "@/services/start-session-whatsapp";
import { stopSessionWhatsApp } from "@/services/stop-session-whatsapp";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";

export function Connect() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const queryClient = useQueryClient();

	const { data: sessionWhatsApp } = useQuery({
		queryKey: ["session-whatsapp"],
		queryFn: getSessionWhatsApp,
	});

	const startSessionMutation = useMutation({
		mutationFn: startSessionWhatsApp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["session-whatsapp"] });
		},
	});

	const stopSessionMutation = useMutation({
		mutationFn: stopSessionWhatsApp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["session-whatsapp"] });
		},
	});

	function handleActivate() {
		setIsDialogOpen(true);
		startSessionMutation.mutate();
	}

	function handleCloseDialog() {
		setIsDialogOpen(false);
		startSessionMutation.reset();
	}

	function handleDeactivate() {
		stopSessionMutation.mutate();
	}

	return (
		<>
			<div className="w-full flex justify-end space-x-2">
				<Button
					variant="default"
					className="bg-green-600 hover:bg-green-700"
					onClick={handleActivate}
					disabled={sessionWhatsApp?.connected}
				>
					<Bot /> Ativar
				</Button>
				<Button
					variant="destructive"
					onClick={handleDeactivate}
					disabled={
						!sessionWhatsApp?.connected || stopSessionMutation.isPending
					}
				>
					{stopSessionMutation.isPending ? (
						<Loader2 className="animate-spin" />
					) : (
						<BotOff />
					)}
					Desativar
				</Button>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Conectar WhatsApp</DialogTitle>
						<DialogDescription>
							Leia o QRCode para conectar o WhatsApp
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center justify-center p-6">
						{startSessionMutation.isPending && (
							<div className="flex flex-col items-center gap-4">
								<Loader2 className="h-12 w-12 animate-spin text-primary" />
								<p className="text-muted-foreground">Gerando QR Code...</p>
							</div>
						)}
						{startSessionMutation.isError && (
							<div className="text-center text-destructive">
								<p>Erro ao iniciar sessão do WhatsApp. Tente novamente.</p>
								<Button
									variant="outline"
									className="mt-4"
									onClick={handleActivate}
								>
									Tentar novamente
								</Button>
							</div>
						)}
						{startSessionMutation.isSuccess &&
							startSessionMutation.data?.qr && (
								<div className="bg-white p-4 rounded-lg">
									<QRCode value={startSessionMutation.data.qr} size={256} />
								</div>
							)}
						{startSessionMutation.isSuccess &&
							startSessionMutation.data?.qr === null && (
								<div className="text-center">
									<p className="text-green-600 font-medium">
										WhatsApp conectado!
									</p>
								</div>
							)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
