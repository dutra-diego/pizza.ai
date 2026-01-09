import type { Boom } from "@hapi/boom";
import { RuntimeContext } from "@mastra/core/runtime-context";
import makeWASocket, { Browsers, DisconnectReason } from "baileys";
import { prisma } from "../lib/prisma";
import { mastra } from "../mastra";
import { Order } from "../services/order-service";
import prismaAuthService from "./prisma-auth-service";

export type userToken = {
	token: string;
};
export const activeSessions = new Map<
	string,
	{
		socket: ReturnType<typeof makeWASocket>;
		botId: string;
		userId: string;
	}
>();

export const startSessionService = async (
	userId: string,
	botId: "recepcionistAssistant",
	token: string,
) => {
	if (activeSessions.has(userId)) {
		return { success: true, message: "Session already exists" };
	}
	const { state, saveCreds } = await prismaAuthService(userId);
	const AllProductsContext = await Order.getProductsWithFlavors(token);
	const sock = makeWASocket({
		auth: state,
		browser: Browsers.windows("Desktop"),
	});

	activeSessions.set(userId, { socket: sock, botId, userId });

	sock.ev.on("messages.upsert", async ({ messages }) => {
		const agent = mastra.getAgent(botId);
		for (const msg of messages) {
			if (!msg.message) continue;

			const from = msg.key.remoteJid;
			const fromMe = msg.key.fromMe;

			if (!from || from.endsWith("@g.us") || fromMe) continue;

			const text =
				msg.message.conversation || msg.message.extendedTextMessage?.text;

			if (text?.startsWith("/bot")) {
				const runtime = new RuntimeContext<userToken>();
				runtime.set("token", token);
				const memoryFromClientAndUser = from
					.split("@")[0]
					.concat("-")
					.concat(userId);
				const resp = await agent.generate(text, {
					memory: {
						resource: memoryFromClientAndUser,
						thread: memoryFromClientAndUser,
					},
					runtimeContext: runtime,
					context: [
						{
							role: "system",
							content: `
							**NO RECEIVED ID SHOULD BE SHARED WITH THE CUSTOMER, EXCEPT THE ORDER ID - DO NOT SEND FLAVOR ID OR PRODUCT ID TO THE CUSTOMER, THIS IS FOR INTERNAL USE ONLY**
						   ** DO NOT ASK FOR THE CUSTOMER'S PHONE NUMBER AND DO NOT PROVIDE THE CUSTOMER'S PHONE NUMBER TO THE USER, ONLY USE THE CUSTOMER'S PHONE NUMBER FOR SCHEDULING**
							UPDATED MENU: ${JSON.stringify(AllProductsContext, null, 2)}
							CUSTOMER PHONE NUMBER: ${from?.split("@")[0]}
							`,
						},
					],
				});
				await sock.sendMessage(from, {
					text: resp.text,
				});
			}
		}
	});

	sock.ev.on("creds.update", saveCreds);

	return new Promise<{ success: boolean; qr?: string; message?: string }>(
		(resolve) => {
			sock.ev.on("connection.update", async (update) => {
				const { connection, lastDisconnect, qr } = update;

				if (qr) {
					resolve({ success: true, qr });
				}

				if (connection === "close") {
					const statusCode = (lastDisconnect?.error as Boom)?.output
						?.statusCode;

					if (statusCode === DisconnectReason.loggedOut) {
						await prisma.session.deleteMany({
							where: { sessionId: userId },
						});

						activeSessions.delete(userId);

						resolve({
							success: false,
							message: "WhatsApp session closed. Please login again.",
						});

						return;
					}

					const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
					activeSessions.delete(userId);

					if (shouldReconnect) {
						setTimeout(() => startSessionService(userId, botId, token), 5000);
					}
				} else if (connection === "open") {
					resolve({ success: true, message: "Connected" });
				}
			});
		},
	);
};
