import { auth } from "@/app/auth.js";
import Link from "next/link";
import SignInForm from "./form.jsx";
import { redirect } from "next/navigation.js";

export default async function SignInPage() {
	const session = await auth();
	if (session?.user) {
		redirect("/");
	}

	return (
		<>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
						Anmeldung
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<SignInForm />
					<p className="mt-10 text-sm text-center text-gray-500">
						Noch kein Mitglied?{" "}
						<Link
							href="/signup"
							className="font-semibold leading-6 text-green-700 hover:text-green-800"
						>
							Hier kostenlos registrieren.
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
