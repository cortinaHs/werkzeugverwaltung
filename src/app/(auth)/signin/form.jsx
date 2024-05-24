"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from './actions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function SignInForm() {
    const [formState, formAction] = useFormState(authenticate, undefined);
	const { pending } = useFormStatus();
	console.log(formState)
    
    return (
			<form className="space-y-6" method="POST">
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
							className="indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
						{/* <div className="text-sm">
									<a
										href="#"
										className="font-semibold text-green-700 hover:text-green-600"
									>
										Passwort vergessen?
									</a>
								</div> */}
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div>
					<button
						formAction={formAction}
						aria-disabled={pending}
						className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
					>
						Anmelden
					</button>
				</div>
				<div className="flex">
					{formState && (
						<div className="contents">
							<ExclamationCircleIcon className="w-5 h-5 text-red-600" />
							<p className="text-sm italic font-medium leading-6 text-red-600 ">
								{formState}
							</p>
						</div>
					)}
				</div>
			</form>
		);
}