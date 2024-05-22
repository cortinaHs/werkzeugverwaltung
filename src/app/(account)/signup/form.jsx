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
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-8 h-8 text-green-600"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
						/>
					</svg> */}
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
									{formState.errors.name.message}
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
