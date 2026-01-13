"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { clientOnly } from "@/lib/client-only";
import { CreateEnterpriseDialog } from "./create-enterprise-dialog";
import { getEnterprise } from "@/services/get-enterprise";
import { Stats } from "../client/home/stats";

function HomeDataInner() {
	const { data: enterprise } = useSuspenseQuery({
		queryKey: ["enterprise"],
		queryFn: getEnterprise,
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
