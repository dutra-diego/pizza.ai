"use client";

import { ChartNoAxesCombined } from "lucide-react";
import type { Enterprise } from "@/types/enterprises";
import { Connect } from "./connect";

export function Stats({ enterprise }: { enterprise: Enterprise }) {
	return (
		<div className="flex flex-col w-screen justify-center items-center p-4 space-y-9">
			<Connect />

			<h1 className="text-2xl text-center">
				Estatísticas da {enterprise?.name}
			</h1>
			<div className="flex flex-wrap gap-20 justify-center">
				<div className="w-60 flex flex-col items-center border rounded-lg h-40 p-4 space-y-2">
					<ChartNoAxesCombined size={40} className="text-primary" />
					<p className="text-lg text-center">
						Total vendido nos últimos 30 dias
					</p>
					<p className="text-lg text-center">
						{enterprise?.totalRevenueLast30Days?.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}
					</p>
				</div>
				<div className="w-60 flex flex-col items-center border rounded-lg h-40 p-4 space-y-2">
					<ChartNoAxesCombined size={40} className="text-primary" />
					<p className="text-lg text-center">Pedidos nos últimos 7 dias</p>
					<p className="text-lg text-center">
						{enterprise?.ordersLast7Days ?? 0}
					</p>
				</div>
				<div className="w-60 flex flex-col items-center border rounded-lg h-40 p-4 space-y-2">
					<ChartNoAxesCombined size={40} className="text-primary" />
					<p className="text-lg text-center">Pedidos nos últimos 14 dias</p>
					<p className="text-lg text-center">
						{enterprise?.ordersLast14Days ?? 0}
					</p>
				</div>
				<div className="w-60 flex flex-col items-center border rounded-lg h-40 p-4 space-y-2">
					<ChartNoAxesCombined size={40} className="text-primary" />
					<p className="text-lg text-center">Pedidos nos últimos 30 dias</p>
					<p className="text-lg text-center">
						{enterprise?.ordersLast30Days ?? 0}
					</p>
				</div>
			</div>
		</div>
	);
}
