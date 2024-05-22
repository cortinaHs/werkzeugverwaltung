import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/footer";
import { HeaderAuthenticated } from "@/components/headerAuthenticated";
import { HeaderNotAuthenticated } from "@/components/headerNotAuthenticated";
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
	revalidatePath("/", "layout")
	const session = await auth()
	return (
		<html lang="en">
			<body className= "flex-col flex-auto min-h-screen">
				{/* Layout UI */}
				{session?.user ? <HeaderAuthenticated /> : <HeaderNotAuthenticated />}
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
