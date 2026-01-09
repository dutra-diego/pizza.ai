import {
	Battery,
	ChevronLeft,
	Menu,
	Phone,
	Send,
	Signal,
	Video,
	Wifi,
} from "lucide-react";

export function PhoneExample() {
	const messages = [
		{
			id: 1,
			sender: "bot",
			text: "Olá! 🍕 Bem-vindo à PizzaFast. Gostaria de fazer um pedido hoje?",
			time: "19:02",
		},
		{
			id: 2,
			sender: "user",
			text: "Oi! Quero uma pizza de Calabresa média, por favor.",
			time: "19:03",
		},
		{
			id: 3,
			sender: "bot",
			text: "Ótima escolha! 😋 Vai querer adicionar borda recheada por +R$ 5,00?",
			time: "19:03",
		},
		{ id: 4, sender: "user", text: "Sim, de Catupiry.", time: "19:04" },
		{
			id: 5,
			sender: "bot",
			text: "Perfeito! Anotei aqui: \n1x Calabresa Média c/ Borda de Catupiry.\n\nTotal: R$ 45,90. Posso enviar para o endereço cadastrado?",
			time: "19:04",
		},
		{ id: 6, sender: "user", text: "Pode sim, obrigado!", time: "19:05" },
		{
			id: 7,
			sender: "bot",
			text: "Pedido confirmado! 🚀 O motoboy sai em 30 min. Se precisar de algo, é só chamar!",
			time: "19:05",
		},
	];

	return (
		<div className="hidden h-full md:flex justify-center items-center">
			<div className="relative  border-black  bg-black border-14 rounded-[2.5rem] h-[600px] w-[320px] shadow-xl">
				<div className="w-[148px] h-[18px] bg-black top-0 rounded-b-2xl left-1/2 -translate-x-1/2 absolute z-20" />
				<div className="h-[32px] w-[3px] bg-black absolute -left-[17px] top-[72px] rounded-l-lg" />
				<div className="h-[46px] w-[3px] bg-black absolute -left-[17px] top-[124px] rounded-l-lg" />
				<div className="h-[46px] w-[3px] bg-black absolute -left-[17px] top-[178px] rounded-l-lg" />
				<div className="h-[64px] w-[3px] bg-black absolute -right-[17px] top-[142px] rounded-r-lg" />

				<div className="rounded-4xl overflow-hidden w-full h-full bg-[#e5ddd5] dark:bg-slate-900 relative flex flex-col">
					<div className="h-12 bg-[#075e54] w-full flex items-center justify-between px-6 pt-2 text-white text-xs z-10">
						<span className="font-semibold">19:05</span>
						<div className="flex space-x-1.5">
							<Signal size={14} strokeWidth={2.5} />
							<Wifi size={14} strokeWidth={2.5} />
							<Battery size={14} strokeWidth={2.5} />
						</div>
					</div>

					<div className="bg-[#075e54] px-4 py-2 flex items-center justify-between shadow-md z-10 text-white">
						<div className="flex items-center space-x-2">
							<ChevronLeft size={24} />
							<div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-300">
								<span className="text-xl">🤖</span>
							</div>
							<div className="flex flex-col">
								<span className="font-semibold text-sm leading-tight">
									PizzaBot 🍕
								</span>
								<span className="text-[10px] opacity-80">online</span>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<Video size={20} />
							<Phone size={18} />
							<Menu size={18} />
						</div>
					</div>

					<div className="flex-1 scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary/0  overflow-x-hidden overflow-y-scroll  p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-10">
						<div className="flex justify-center my-2">
							<div className="bg-[#ffeb3b] text-gray-800 text-[10px] py-1 px-3 rounded shadow-sm text-center max-w-[80%] opacity-80">
								As mensagens são protegidas com criptografia de ponta-a-ponta.
							</div>
						</div>

						{messages.map((msg) => (
							<div
								key={msg.id}
								className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`relative max-w-[75%] p-2 rounded-lg text-sm shadow-sm ${
										msg.sender === "user"
											? "bg-[#dcf8c6] text-gray-800 rounded-tr-none"
											: "bg-white text-gray-800 rounded-tl-none"
									}`}
								>
									<p className="whitespace-pre-line leading-snug">{msg.text}</p>
									<span className="block text-[9px] text-gray-500 text-right mt-1 -mb-1">
										{msg.time}
										{msg.sender === "user" && (
											<span className="ml-1 text-blue-500 font-bold">✓✓</span>
										)}
									</span>

									<div
										className={`absolute top-0 w-0 h-0 border-[6px] border-transparent ${
											msg.sender === "user"
												? "right-[-6px] border-t-[#dcf8c6] border-l-[#dcf8c6]"
												: "left-[-6px] border-t-white border-r-white"
										}`}
									></div>
								</div>
							</div>
						))}

						<div className="h-2" />
					</div>

					<div className="bg-[#f0f0f0] p-2 flex items-center space-x-2 z-10 pb-6">
						<div className="bg-white flex-1 rounded-full px-4 py-2 text-gray-400 text-sm shadow-sm flex items-center justify-between">
							<span>Mensagem</span>
						</div>
						<div className="bg-[#075e54] p-2.5 rounded-full text-white shadow-md cursor-pointer hover:bg-[#064e46] transition">
							<Send size={18} />
						</div>
					</div>

					<div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-20 opacity-50"></div>
				</div>
			</div>
		</div>
	);
}
