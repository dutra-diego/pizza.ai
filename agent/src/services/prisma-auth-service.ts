import {
	type AuthenticationCreds,
	type AuthenticationState,
	BufferJSON,
	initAuthCreds,
	WAProto as proto,
	type SignalDataTypeMap,
} from "@whiskeysockets/baileys";
import { prisma } from "../lib/prisma";

type BaileysAuthData =
	| AuthenticationCreds
	| SignalDataTypeMap[keyof SignalDataTypeMap];

export default async function prismaAuthService(
	sessionID: string,
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> {
	const writeData = async (
		data: BaileysAuthData,
		credId: string,
	): Promise<void> => {
		try {
			const dataString = JSON.stringify(data, BufferJSON.replacer);

			await prisma.sessions.upsert({
				where: {
					sessionId_credId: {
						sessionId: sessionID,
						credId: credId,
					},
				},
				update: {
					data: dataString,
				},
				create: {
					sessionId: sessionID,
					credId: credId,
					data: dataString,
				},
			});
		} catch (error) {
			console.error(`Error saving key ${credId} to database:`, error);
		}
	};

	const readData = async (credId: string): Promise<BaileysAuthData | null> => {
		try {
			const result = await prisma.sessions.findUnique({
				where: {
					sessionId_credId: {
						sessionId: sessionID,
						credId: credId,
					},
				},
			});

			if (!result) return null;

			return JSON.parse(result.data, BufferJSON.reviver);
		} catch (error) {
			console.error(`Error reading key ${credId} from database:`, error);
			return null;
		}
	};

	const removeData = async (credId: string): Promise<void> => {
		try {
			await prisma.sessions.delete({
				where: {
					sessionId_credId: {
						sessionId: sessionID,
						credId: credId,
					},
				},
			});
		} catch { }
	};

	const credsData = await readData("creds");
	const creds: AuthenticationCreds =
		credsData && typeof credsData === "object" && "me" in credsData
			? (credsData as AuthenticationCreds)
			: initAuthCreds();

	if (!credsData) {
		await writeData(creds, "creds");
	}

	return {
		state: {
			creds,
			keys: {
				get: async <T extends keyof SignalDataTypeMap>(
					type: T,
					ids: string[],
				): Promise<{ [id: string]: SignalDataTypeMap[T] }> => {
					const data: { [id: string]: SignalDataTypeMap[T] } = {};

					await Promise.all(
						ids.map(async (id) => {
							let value = await readData(`${String(type)}-${id}`);

							if (
								type === "app-state-sync-key" &&
								value &&
								typeof value === "object" &&
								!Array.isArray(value)
							) {
								value = proto.Message.AppStateSyncKeyData.fromObject(
									value as Record<string, unknown>,
								);
							}

							if (value !== null) {
								data[id] = value as SignalDataTypeMap[T];
							}
						}),
					);

					return data;
				},
				set: async (data: Record<string, Record<string, BaileysAuthData>>) => {
					const tasks: Promise<void>[] = [];

					for (const category in data) {
						for (const id in data[category]) {
							const value = data[category][id];
							const key = `${category}-${id}`;

							if (value) {
								tasks.push(writeData(value, key));
							} else {
								tasks.push(removeData(key));
							}
						}
					}

					await Promise.all(tasks);
				},
			},
		},
		saveCreds: async () => {
			await writeData(creds, "creds");
		},
	};
}
