import { Inter } from "next/font/google";
import "./globals.css";
import {Footer} from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Neighbortool",
	description: "Wirtschaftsinformatik-Projekt Werkzeugverwaltung",
	icons: {
		icon: "toolIcon.svg"
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
      <body>
        {/* Layout UI */}
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
