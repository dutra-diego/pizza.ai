import { destroyCookie, parseCookies, setCookie } from "nookies";

const TOKEN_KEY = "token";
const TOKEN_MAX_AGE = 60 * 360;

export function setAuthToken(token: string) {
	setCookie(null, TOKEN_KEY, token, {
		maxAge: TOKEN_MAX_AGE,
		path: "/",
		sameSite: "lax",
	});
}

export function getAuthToken(): string | null {
	const cookies = parseCookies();
	return cookies[TOKEN_KEY] ?? null;
}

export function removeAuthToken() {
	destroyCookie(null, TOKEN_KEY, { path: "/" });
}
