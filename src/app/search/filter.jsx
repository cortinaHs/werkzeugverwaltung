"use client";
import { ToolGrid } from "../../components/search/toolgrid";
import { SearchField } from "@/components/search/searchField";
import { CategorySelection } from "@/components/search/categoryFilters";
import { DatePickerWithRange } from "@/components/search/dateRangePicker";
import { Fragment, useState } from "react";
import {
	Dialog,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItems,
	MenuItem,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FavoritesCheckbox } from "@/components/search/favoritesCheckbox";
import { Button as LinkButton } from "@headlessui/react";

const sortOptions = [
	{ name: "Neueste", value: ["createdAtdesc"] },
	{ name: "Name A-Z", value: ["nameasc"] },
	{ name: "Name Z-A", value: ["namedesc"] },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}


export function SearchFilter({
	categories,
	tools,
	favorites,
	redirecttoolregistration,
}) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const [sortOption, setSortOption] = useState(undefined);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleSorting(sortOption) {
		const params = new URLSearchParams(searchParams);
		params.set("sort", sortOption);

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<TransitionChild
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</TransitionChild>

						<div className="fixed inset-0 z-40 flex">
							<TransitionChild
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<DialogPanel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Filter
										</h2>
										<button
											type="button"
											className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
											onClick={() => setMobileFiltersOpen(false)}
										>
											<span className="sr-only">Close menu</span>
											<XMarkIcon className="w-6 h-6" aria-hidden="true" />
										</button>
									</div>

									{/* Filters */}
									<form className="mt-4 border-t border-gray-200">
										<div className="px-2 pb-6 space-y-4 text-sm border-b border-gray-200 ">
											<SearchField />
										</div>

										<br />
										<div className="px-2 pb-6 space-y-4 text-sm border-b border-gray-200 ">
											<FavoritesCheckbox />
										</div>
										<br />

										<h3 className="sr-only">Kategorien</h3>
										<div className="px-2 pb-6 space-y-4 text-sm border-b border-gray-200 ">
											<CategorySelection categories={categories} />
										</div>
										<br />
										<div className="px-2 pb-6 space-y-4 text-sm border-b border-gray-200 ">
											<DatePickerWithRange />
										</div>
									</form>
								</DialogPanel>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>

				<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							Gartengeräte und Werkzeuge
						</h1>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
										Sortieren
										<ChevronDownIcon
											className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</MenuButton>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<MenuItems className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{sortOptions.map((option) => (
												<MenuItem key={option.name}>
													{({ open }) => (
														<button
															type="button"
															onClick={() => {
																setSortOption(option.value);
																handleSorting(option.value);
															}}
															className={classNames(
																option.value === sortOption
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																open ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm"
															)}
														>
															{option.name}
														</button>
													)}
												</MenuItem>
											))}
										</div>
									</MenuItems>
								</Transition>
							</Menu>

							<button
								type="button"
								className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="tools-heading" className="pt-6 pb-24">
						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							{/* Filter */}

							<form className="hidden lg:block">
								<div className="pb-6 space-y-4 border-b border-gray-200">
									<SearchField />
								</div>

								<br />
								<div className="pb-6 space-y-4 text-sm border-b border-gray-200">
									<FavoritesCheckbox />
								</div>
								<br />
								<div className="w-full pb-6 space-y-4 border-b border-gray-200">
									<CategorySelection categories={categories} />
								</div>
								<br />
								<div className="pb-6 space-y-4 border-b border-gray-200">
									<DatePickerWithRange />
								</div>
							</form>

							{/* Product grid */}
							<div className="lg:col-span-3">
								{tools.length != 0 ? (
									<ToolGrid tools={tools} favorites={favorites} />
								) : (
									<div>
										<p className="py-2 text-gray-700">
											Keine Geräte vorhanden.
										</p>
										<form action={redirecttoolregistration}>
											<LinkButton
												type="submit"
												className="rounded bg-green-600 py-2 px-4 text-sm text-white data-[hover]:bg-green-500 data-[active]:bg-green-700"
											>
												Geräte hinzufügen
											</LinkButton>
										</form>
									</div>
								)}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
