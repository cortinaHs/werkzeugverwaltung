import { FormEvent } from "react";

export default async function RegisterPage() {

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = FormData(e.currentTarget);
		const response = await fetch('api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		}); 
		console.log(email, password)
	}

	
	return (

		<>

			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
						Registrierung
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Registrieren
							</button>
						</div>
					</form>

					<p className="mt-10 text-sm text-center text-gray-500">
						Bereits Mitglied?{" "}
						<a
							href="#"
							className="font-semibold leading-6 text-green-700 hover:text-green-800"
						>
							Hier anmelden.
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
