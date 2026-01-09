"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/contexts/auth";
import { Button } from "../ui/button";

export function Navbar() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	const { open, setOpen } = useAuthModal();

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<nav className="flex justify-between items-center w-full px-2 md:px-8 py-2 bg-background border-b border-border">
			<Link href="/" className="flex space-x-2 items-center">
				<Image src="/pizza.svg" alt="Pizza" width={20} height={20} />
				Pizza.ai
			</Link>
			<div className="flex space-x-3">
				<Button
					type="button"
					variant="ghost"
					onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
				>
					{mounted && (resolvedTheme === "dark" ? <Sun /> : <Moon />)}
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={() => setOpen(open === "login" ? "" : "login")}
				>
					Login
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={() => setOpen(open === "register" ? "" : "register")}
				>
					Registrar
				</Button>
			</div>
		</nav>
	);
}
