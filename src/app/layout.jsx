import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/footer";
import CustomHeader from "@/components/CustomHeader";
import { SessionProvider } from "next-auth/react";
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
	const session = auth()
	return (
		<html lang="en">
			<body>
				<SessionProvider session={session}>
					{/* Layout UI */}
					<CustomHeader />
					<main>{children}</main>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
