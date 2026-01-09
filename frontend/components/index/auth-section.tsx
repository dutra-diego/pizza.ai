"use client";
import { useAuthModal } from "@/contexts/auth";
import { Login } from "./login";
import { Register } from "./register";

export function AuthSection() {
	const open = useAuthModal((state) => state.open);
	return (
		<>
			{(open === "login" && <Login />) || (open === "register" && <Register />)}
		</>
	);
}
