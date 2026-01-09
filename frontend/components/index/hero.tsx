import { BotMessageSquare, ChartNoAxesCombined } from "lucide-react";

export function Hero() {
	return (
		<div className="lg:basis-1/2 flex justify-center items-center flex-col space-y-4">
			<h1 className="text-2xl  md:text-4xl text-center text-primary px-2">
				Sua Pizzaria Totalmente{" "}
				<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-600">
					Automática
				</span>{" "}
				🍕
			</h1>
			<p className="text-accent-foreground text-lg text-center  px-2 max-w-140">
				Não demore para responder no Whatsapp, Nosso bot atende, tira dúvidas e
				fecha pedido sozinho. Integrado diretamente a sua cozinha.
			</p>
			<div className="grid grid-cols-2   space-x-2 px-2 md:space-x-6 py-6">
				<div className=" border rounded-lg flex flex-col border-border p-3 space-y-2 max-w-44">
					<ChartNoAxesCombined size="36" className="self-center text-primary" />
					<span className="text-accent-foreground text-lg text-center">
						Aumente as vendas na sua pizzaria em até 50%
					</span>
				</div>
				<div className="border rounded-lg flex flex-col border-border p-3 space-y-2 max-w-44">
					<BotMessageSquare size="36" className="self-center text-primary" />
					<span className="text-accent-foreground text-lg text-center">
						Bot disponível por até 24/7
					</span>
				</div>
			</div>
		</div>
	);
}
