import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/footer";
import { NavAuthenticated } from "@/components/navAuthenticated";
import { NavNotAuthenticated } from "@/components/navNotAuthenticated";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
	title: "Neighbortool",
	description: "Wirtschaftsinformatik-Projekt Werkzeugverwaltung",
	icons: {
		icon: "toolIcon.svg"
	}
};


export default async function RootLayout({ children }) {
const navigation = [
	{ name: "Gerätesuche", href: "/search", current: false },
	{ name: "Reservierungen", href: "/reservations", current: false },
	{ name: "Gerät registrieren", href: "/toolregistration", current: false },
];
	
	revalidatePath("/", "layout")
	const session = await auth()
	if (session?.user.role === "admin") {
		navigation.push({name: "Admintools", href:"/admin", current: false})
	}
	return (
		<html lang="en" className={inter.className}>
			<body className="h-full">
				{/* Layout UI */}
				{session?.user ? <NavAuthenticated navigation={navigation} /> : <NavNotAuthenticated />}
				<main>
					<div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
						{children}
					</div>
				</main>

				<Footer />
			</body>
		</html>
	);
}
