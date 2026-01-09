import { Navbar } from "@/components/client/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<Navbar />
			<main className="flex-1 overflow-hidden">{children}</main>
		</div>
	);
}
