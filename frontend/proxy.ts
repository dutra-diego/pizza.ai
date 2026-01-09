import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const protectedPages = [
		"/client",
		"/client/orders",
		"/client/agents",
		"/client/products",
	];
	const token = request.cookies.get("token");
	const isAuthPage = request.nextUrl.pathname === "/";
	const isProtectedPage = protectedPages.some((route) =>
		request.nextUrl.pathname.startsWith(route),
	);

	if (token && isAuthPage) {
		return NextResponse.redirect(new URL("/client", request.url));
	}

	if (!token && isProtectedPage) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/client/:path*"],
};
