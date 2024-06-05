"use client";

import { signUp } from "./action";
import { useFormState } from "react-dom";


export function SignupForm() {
	const [formState, formAction] = useFormState(signUp, undefined);

	return (
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
				<label
					htmlFor="password"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Passwort
				</label>

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
							Password muss:
						</p>
						<ul>
							{formState.errors.password.map((error) => (
								<li className="block text-sm italic text-red-600" key={error}>
									- {error}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{formState?.errors &&
				!formState?.errors.password &&
				!formState?.errors.email &&
				!formState?.errors.name && (
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
	);
}
