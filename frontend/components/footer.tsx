export function Footer() {
	return (
		<footer className="flex justify-center items-center h-10 ">
			<p className="text-accent-foreground text-sm">
				© {new Date().getFullYear()} Pizza.ai. Todos os direitos reservados.
			</p>
		</footer>
	);
}
