"use client";
import { useFormState } from "react-dom";
import { PhotoUploader } from "@/components/photoUploader";
import { CategorySelector } from "@/components/categorySelector";

export function ToolregistrationForm({ handleForm, categories }) {
	const [formState, formAction] = useFormState(handleForm, undefined);


	return (
		<form action={formAction}>
			<div className="space-y-12">
				<div className="pb-12 border-b border-gray-900/10">
					<div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name des Geräts*
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										required
										type="name"
										name="name"
										id="name"
										autoComplete="name"
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
						</div>
						
						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Beschreibung*
							</label>
							<div className="mt-2">
								<textarea
									required
									id="description"
									name="description"
									type="description"
									rows={3}
									className={`indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
										formState?.errors.description
											? "ring-red-600 focus:ring-red-600 text-red-600 "
											: ""
									}`}
									defaultValue={""}
								/>
								{formState?.errors.description && (
									<p className="block text-sm italic text-red-600">
										{formState.errors.description}
									</p>
								)}
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Schreibe ein paar Worte über das Gerät.
							</p>
						</div>
						<div className="sm:col-span-4 sm:max-w-md">
							<CategorySelector categories={categories} formState={formState} />
						</div>
						<div className="col-span-full">
							<PhotoUploader />
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end mt-6 gap-x-6">
				<button
					type="submit"
					className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
				>
					Speichern
				</button>
			</div>
		</form>
	);
}
