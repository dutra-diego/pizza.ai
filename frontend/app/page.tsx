import { Footer } from "@/components/footer";
import { AuthSection } from "@/components/index/auth-section";
import { Hero } from "@/components/index/hero";

import { Navbar } from "@/components/index/navbar";
import { PhoneExample } from "@/components/index/phone-example";

export default function Home() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="flex-1">
				<div className="flex lg:px-5.5 relative h-full">
					<Hero />
					<div className=" flex-col lg:basis-1/2 justify-center items-center ">
						<AuthSection />
						<PhoneExample />
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
