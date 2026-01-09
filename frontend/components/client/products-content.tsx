"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { clientOnly } from "@/lib/client-only";
import { GetProducts } from "@/services/get-products";
import { AddProduct } from "./products/add-product";
import { EditProduct } from "./products/edit-product";
import { ProductFlavors } from "./products/product-flavors";

function ProductsListInner({
	onSelectProduct,
}: {
	onSelectProduct: (id: string) => void;
}) {
	const { data: products } = useSuspenseQuery({
		queryKey: ["products"],
		queryFn: GetProducts,
	});

	return (
		<>
			{products?.map((product) => (
				<div
					key={product.id}
					className="border rounded-lg hover:cursor-pointer hover:bg-gray-700/10 flex items-center justify-between px-1"
				>
					<Button
						variant="none"
						className="flex flex-1 justify-start p-1"
						onClick={() => onSelectProduct(product.id)}
					>
						<p className="text-left text-ellipsis">{product.name}</p>
					</Button>

					<EditProduct product={product} />
				</div>
			))}
		</>
	);
}

const ProductsList = clientOnly(ProductsListInner);

export function ProductsContent() {
	const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

	return (
		<div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
			<div className="w-full md:w-60 shrink-0 py-2 border-b md:border-b-0 md:border-r">
				<div className="flex items-center justify-between py-2 px-4 border-b">
					<p>Produtos</p>
					<AddProduct />
				</div>
				<div className="max-h-40 md:max-h-none md:h-full overflow-y-auto p-2 space-y-2">
					<Suspense fallback={<Loading />}>
						<ProductsList onSelectProduct={setSelectedProduct} />
					</Suspense>
				</div>
			</div>
			<div className="flex-1 min-w-0 flex justify-center overflow-x-auto">
				{selectedProduct ? (
					<Suspense fallback={<Loading />}>
						<ProductFlavors productId={selectedProduct} />
					</Suspense>
				) : (
					<p className="text-lg m-auto">Selecione um produto.</p>
				)}
			</div>
		</div>
	);
}
