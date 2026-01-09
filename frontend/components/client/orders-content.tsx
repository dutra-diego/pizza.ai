"use client";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Loading } from "@/components/loading";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { clientOnly } from "@/lib/client-only";
import { GetOrders } from "@/services/get-orders";
import { UpdateOrders } from "@/services/update-orders";
import { columns, type Order, type OrderStatus } from "./orders/columns-table";
import { OrdersTable } from "./orders/orders-table";

const statusFlow: Record<string, OrderStatus> = {
	"Em produção": "Saiu para entrega",
	"Saiu para entrega": "Concluido",
	Concluido: "Concluido",
	Cancelado: "Cancelado",
};

interface OrdersDataProps {
	onSelectOrder: (order: Order) => void;
}

function OrdersDataInner({ onSelectOrder }: OrdersDataProps) {
	const queryClient = useQueryClient();

	const { data: ordersData } = useSuspenseQuery({
		queryKey: ["orders"],
		queryFn: () => GetOrders(),
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, status }: { id: number; status: string }) =>
			UpdateOrders(id, status),
		onMutate: async ({ id, status }) => {
			await queryClient.cancelQueries({ queryKey: ["orders"] });

			const previousOrders = queryClient.getQueryData<Order[]>(["orders"]);

			queryClient.setQueryData<Order[]>(["orders"], (old) =>
				old?.map((order) =>
					order.id === id ? { ...order, status: status as OrderStatus } : order,
				),
			);

			return { previousOrders };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousOrders) {
				queryClient.setQueryData(["orders"], context.previousOrders);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	const handleAdvance = (id: number) => {
		const order = ordersData?.find((o) => o.id === id);
		if (order) {
			const nextStatus = statusFlow[order.status];
			updateMutation.mutate({ id, status: nextStatus });
		}
	};

	const handleCancel = (id: number) => {
		updateMutation.mutate({ id, status: "Cancelado" });
	};

	return (
		<OrdersTable
			columns={columns}
			data={ordersData ?? []}
			onAdvance={handleAdvance}
			onDetails={onSelectOrder}
			onCancel={handleCancel}
		/>
	);
}

const OrdersData = clientOnly(OrdersDataInner);

function OrderDetails({
	order,
	onClose,
}: {
	order: Order;
	onClose: () => void;
}) {
	return (
		<Dialog open={true} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Pedido #{order.id}</DialogTitle>
					<DialogDescription>{order.name}</DialogDescription>
					<DialogDescription>{order.deliveryAddress}</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{order.products.map((product) => (
						<div key={product.id} className="rounded-lg border p-4 space-y-2">
							<div className="flex justify-between items-start">
								<div>
									<p className="font-medium">{product.productName}</p>
									<p className="text-sm text-muted-foreground">
										{product.size}
									</p>
									<p className="text-sm text-muted-foreground">
										Qtd: {product.quantity}
									</p>
									{product.flavors.length > 0 && (
										<p className="text-muted-foreground">
											Sabores: {product.flavors
												.map((f) => f.name)
												.join(", ")}{" "}
										</p>
									)}
								</div>
								<p className="font-semibold">
									R$ {product.totalPrice.toFixed(2)}
								</p>
							</div>
						</div>
					))}

					<div className="flex justify-between pt-4 border-t font-semibold">
						<span>Total do Pedido</span>
						<span>R$ {order.orderTotal.toFixed(2)}</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function OrdersContent() {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	return (
		<div className="flex items-center p-4 max-w-4/5 mx-auto">
			<Suspense fallback={<Loading />}>
				<OrdersData onSelectOrder={setSelectedOrder} />
			</Suspense>

			{selectedOrder && (
				<OrderDetails
					order={selectedOrder}
					onClose={() => setSelectedOrder(null)}
				/>
			)}
		</div>
	);
}
