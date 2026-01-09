"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { clientOnly } from "@/lib/client-only";
import { GetEnterprise } from "@/services/get-enterprise";
import { CreateEnterpriseDialog } from "./create-enterprise-dialog";
import { Stats } from "./stats";

function HomeDataInner() {
	const { data: enterprise } = useSuspenseQuery({
		queryKey: ["enterprise"],
		queryFn: GetEnterprise,
		retry: false,
	});

	if (enterprise === null) {
		return <CreateEnterpriseDialog />;
	}

	return <Stats enterprise={enterprise} />;
}

const HomeData = clientOnly(HomeDataInner);

export function HomeContent() {
	return (
		<Suspense fallback={<Loading />}>
			<HomeData />
		</Suspense>
	);
}
