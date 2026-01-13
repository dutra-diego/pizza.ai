"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { clientOnly } from "@/lib/client-only";
import { getFlavors } from "@/services/get-flavors";
import { AddFlavor } from "./flavors/add-flavor";
import { flavorColumns } from "./flavors/columns-table";
import { FlavorsTable } from "./flavors/flavors-table";

function FlavorsDataInner({ productId }: { productId: string }) {
	const { data: flavors } = useSuspenseQuery({
		queryKey: ["flavors", productId],
		queryFn: () => getFlavors(productId),
	});

	return <FlavorsTable columns={flavorColumns} data={flavors || []} />;
}

const FlavorsData = clientOnly(FlavorsDataInner);

export function ProductFlavors({ productId }: { productId: string }) {
	return (
		<div className="flex-1 min-w-0 w-full p-4">
			<div className="flex items-center justify-between px-2 py-4">
				<h2 className="flex text-lg font-semibold">Sabores</h2>
				<AddFlavor productId={productId} />
			</div>
			<FlavorsData productId={productId} />
		</div>
	);
}
