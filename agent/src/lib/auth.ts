import type { JwtType } from "../types/jwtSchema";

export const extractUserId = (payload: JwtType): string => {
	const userId = payload.userId ?? payload.nameid ?? payload.sub;
	if (!userId) {
		throw new Error("User ID not found in token");
	}
	return userId;
};

export const extractBearerToken = (authHeader?: string): string | null => {
	if (!authHeader) return null;
	return authHeader.replace(/^Bearer\s+/i, "") || null;
};
