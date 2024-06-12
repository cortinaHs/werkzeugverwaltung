import { redirect } from "next/navigation";
import { SignupForm } from "./form";
import { auth } from "@/app/auth";
import Link from "next/link";

export default async function SignupPage() {
	const session = await auth();
	if (session?.user) {
		redirect("/");
	}

	return (
		<>
			<div className="flex flex-col justify-center flex-1 px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
						Registrierung
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<SignupForm />
					<p className="mt-10 text-sm text-center text-gray-500">
						Bereits Mitglied?{" "}
						<Link
							href="/signin"
							className="font-semibold leading-6 text-green-700 hover:text-green-800"
						>
							Hier anmelden.
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
