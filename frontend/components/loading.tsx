import { Loader2 } from "lucide-react";

export function Loading() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Loader2 className="animate-spin" />
		</div>
	);
}
