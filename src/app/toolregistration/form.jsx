"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useFormState, useFormStatus } from "react-dom";
import { Fragment, useState } from "react";
import {
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FileUploader } from "react-drag-drop-files";
import { XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function ToolrestrationForm({ handleForm, categories }) {
	const [formState, formAction] = useFormState(handleForm, undefined);
	// const { pending } = useFormStatus();
	const [selected, setSelected] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const fileTypes = ["JPG", "PNG", "GIF"];

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
										className="`indent-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
								{/* {formState?.errors.name && (
									<p className="block text-sm italic text-red-600">
										{formState.errors.name}
									</p>
								)} */}
							</div>
						</div>

						<div className="sm:col-span-4 sm:max-w-md">
							<Listbox value={selected} onChange={setSelected}>
								{({ open }) => (
									<>
										<Label className="block text-sm font-medium leading-6 text-gray-900">
											Kategorie*
										</Label>

										<div className="relative mt-2">
											<ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
												<span className="flex items-center">
													<span className="block ml-3 truncate">
														{selected?.name || "Wähle eine Kategorie"}
													</span>
												</span>
												<span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
													<ChevronUpDownIcon
														className="w-5 h-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
												<input
													name="categoryId"
													className="hidden"
													value={selected?.id || ""}
													readOnly
													required
												/>
											</ListboxButton>

											<Transition
												show={open}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<ListboxOptions className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{categories.map((category) => (
														<ListboxOption
															key={category.id}
															className={({ focus }) =>
																classNames(
																	focus ? "bg-indigo-600 text-white" : "",
																	!focus ? "text-gray-900" : "",
																	"relative cursor-default select-none py-2 pl-3 pr-9"
																)
															}
															value={category}
														>
															{({ selected, focus }) => (
																<>
																	<div className="flex items-center">
																		<span
																			className={classNames(
																				selected
																					? "font-semibold"
																					: "font-normal",
																				"ml-3 block truncate"
																			)}
																		>
																			{category.name}
																		</span>
																	</div>

																	{selected ? (
																		<>
																			<span
																				className={classNames(
																					focus
																						? "text-white"
																						: "text-indigo-600",
																					"absolute inset-y-0 right-0 flex items-center pr-4"
																				)}
																			>
																				<CheckIcon
																					className="w-5 h-5"
																					aria-hidden="true"
																				/>
																			</span>
																		</>
																	) : null}
																</>
															)}
														</ListboxOption>
													))}
												</ListboxOptions>
											</Transition>
										</div>
									</>
								)}
							</Listbox>
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
									className="indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Schreibe ein paar Worte über das Gerät.
							</p>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Bild
							</label>

							<FileUploader
								handleChange={setSelectedFile}
								name="file-upload"
								types={fileTypes}
								type="file"
								id="file-upload"
							>
								{
									<div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
										<div className="text-center">
											<PhotoIcon
												className="w-12 h-12 mx-auto text-gray-300"
												aria-hidden="true"
											/>
											<div className="flex mt-4 text-sm leading-6 text-gray-600">
												<label
													htmlFor="file-upload"
													className="relative font-semibold text-green-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
												>
													<span>Bild hochladen</span>
													<input
														id="file-upload"
														name="file-upload"
														type="file"
														onChange={(e) => setSelectedFile(e.target.files[0])}
														className="z-10 hidden"
													/>
												</label>
											</div>
											<p className="text-xs leading-5 text-gray-600">
												PNG, JPG, GIF
											</p>
										</div>
									</div>
								}
							</FileUploader>

							<div>
								{selectedFile && (
									<div className="mt-3 text-sm leading-6 text-gray-600">
										<span>{selectedFile.name}</span>
										<button onClick={() => setSelectedFile(null)}>
											<XMarkIcon className="w-5 h-5 py-1" />
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end mt-6 gap-x-6">
				<button
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
				>
					Abbrechen
				</button>
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
