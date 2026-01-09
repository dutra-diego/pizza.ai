import z from "zod";

export const StartSessionSchema = z.object({
	botId: z.enum(["recepcionistAssistant"]),
});
export type StartSessionType = z.infer<typeof StartSessionSchema>;
