import z from "zod";

export const JwtSchema = z
	.object({
		userId: z.string().min(1).optional(),
		nameid: z.string().min(1).optional(),
		sub: z.string().min(1).optional(),
	})
	.refine((payload) => payload.userId || payload.nameid || payload.sub, {
		message: "userId, nameid or sub is required",
	});

export type JwtType = z.infer<typeof JwtSchema>;
