"use client";

import { signUp } from "@/app/actions/signup";
import { useFormState } from "react-dom";
import Link from "next/link";

export function SignupForm() {
	const [formState, formAction] = useFormState(signUp, undefined);

	return (
		<>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
						Registrierung
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" method="POST">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="name"
									autoComplete="name"
									required
									className={`indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
										formState?.errors.name
											? "ring-red-600 focus:ring-red-600 text-red-600 "
											: ""
									}`}
								/>
							</div>
							{formState?.errors.name && (
								<p className="block text-sm italic text-red-600">
									{formState.errors.name}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email Adresse
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className={`indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
										formState?.errors.email
											? "ring-red-600 focus:ring-red-600 text-red-600 "
											: ""
									}`}
								/>
							</div>

							{formState?.errors.email && (
								<p className="block text-sm italic font-medium leading-6 text-red-600">
									{formState.errors.email}
								</p>
							)}
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Passwort
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className={`indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
										formState?.errors.password
											? "ring-red-600 focus:ring-red-600 text-red-600 "
											: ""
									}`}
								/>
							</div>

							{formState?.errors.password && (
								<div>
									<p className="block text-sm italic font-medium leading-6 text-red-600">
										Password must:
									</p>
									<ul>
										{formState.errors.password.map((error) => (
											<li
												className="block text-sm italic text-red-600"
												key={error}
											>
												- {error}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{formState?.errors && (
							<p className="block text-sm italic font-medium leading-6 text-red-600">
								{formState.errors}
							</p>
						)}

						<div>
							<button
								formAction={formAction}
								className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
							>
								Registrieren
							</button>
						</div>
					</form>

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
