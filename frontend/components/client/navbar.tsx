"use client";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { logout } from "@/app/actions/auth";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

export function Navbar() {
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	const getActivePage = () => {
		if (pathname?.includes("/orders")) return "orders";
		if (pathname?.includes("/products")) return "products";
		return "home";
	};

	const page = getActivePage();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleLogout = () => {
		logout();
	};

	return (
		<nav className="flex justify-between items-center w-full px-2 md:px-8 py-2 bg-background border-b border-border">
			<Link href="/" className="flex space-x-2 items-center">
				<Image src="/pizza.svg" alt="Pizza" width={20} height={20} />
				Pizza.ai
			</Link>

			<div className="hidden md:flex">
				<Button
					variant="link"
					asChild
					className={page === "home" ? "underline" : ""}
				>
					<Link href="/client">Home</Link>
				</Button>
				<Button
					variant="link"
					asChild
					className={page === "orders" ? "underline" : ""}
				>
					<Link href="/client/orders">Pedidos</Link>
				</Button>
				<Button
					variant="link"
					asChild
					className={page === "products" ? "underline" : ""}
				>
					<Link href="/client/products">Produtos</Link>
				</Button>
			</div>

			<div className="hidden md:flex items-center gap-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
				>
					{mounted && (resolvedTheme === "dark" ? <Sun /> : <Moon />)}
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={handleLogout}
				>
					<LogOut className="h-5 w-5" />
				</Button>
			</div>

			<div className="md:hidden">
				<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="w-[280px] bg-slate-200 dark:bg-slate-900"
					>
						<SheetHeader>
							<SheetTitle className="flex items-center gap-2">
								<Image src="/pizza.svg" alt="Pizza" width={20} height={20} />
								Pizza.ai
							</SheetTitle>
							<SheetDescription className="sr-only">
								Menu de navegação mobile
							</SheetDescription>
						</SheetHeader>
						<div className="flex flex-col gap-2 mt-6">
							<Button
								variant={page === "home" ? "secondary" : "ghost"}
								asChild
								className="justify-start"
							>
								<Link href="/client" onClick={() => setMobileMenuOpen(false)}>
									Home
								</Link>
							</Button>
							<Button
								variant={page === "orders" ? "secondary" : "ghost"}
								asChild
								className="justify-start"
							>
								<Link
									href="/client/orders"
									onClick={() => setMobileMenuOpen(false)}
								>
									Pedidos
								</Link>
							</Button>

							<Button
								variant={page === "products" ? "secondary" : "ghost"}
								asChild
								className="justify-start"
							>
								<Link
									href="/client/products"
									onClick={() => setMobileMenuOpen(false)}
								>
									Produtos
								</Link>
							</Button>

							<div className="border-t border-border my-4" />

							<Button
								variant="ghost"
								className="justify-start"
								onClick={() =>
									setTheme(resolvedTheme === "dark" ? "light" : "dark")
								}
							>
								{mounted && resolvedTheme === "dark" ? (
									<>
										<Sun className="mr-2 h-4 w-4" />
										Light
									</>
								) : (
									<>
										<Moon className="mr-2 h-4 w-4" />
										Dark
									</>
								)}
							</Button>

							<Button
								variant="ghost"
								className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
								onClick={() => {
									handleLogout();
									setMobileMenuOpen(false);
								}}
							>
								<LogOut className="mr-2 h-4 w-4" />
								Sair
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
}
