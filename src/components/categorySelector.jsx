import {
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useFormState } from "react-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function CategorySelector({ categories, formState }) {
	const [selected, setSelected] = useState(null);

	return (
		<Listbox value={selected} onChange={setSelected}>
			{({ open }) => (
				<>
					<Label className="block text-sm font-medium leading-6 text-gray-900">
						Kategorie*
					</Label>

					<div className="relative mt-2">
						<ListboxButton
							className={`indent-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
								formState?.errors.category
									? "ring-red-600 focus:ring-red-600 text-red-600 "
									: ""
							}`}
							// className="pl-3 pr-10 text-left cursor-default "
						>
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
						{formState?.errors.category && (
							<p className="block text-sm italic text-red-600">
								{formState.errors.category}
							</p>
						)}
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
												focus ? "bg-green-600 text-white" : "",
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
															selected ? "font-semibold" : "font-normal",
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
																focus ? "text-white" : "text-green-600",
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
	);
}
