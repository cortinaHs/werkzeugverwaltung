"use client";
import { ToolGrid } from "../../components/toolgrid";
import { SearchField } from "@/components/searchField";
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
	Checkbox,
	Label,
	Field,
	Radio,
	RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const sortOptions = [
	{ name: "Neueste", href: "#", current: false },
	{ name: "Name A-Z", href: "#", current: false },
	{ name: "Name Z-A", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function SearchFilter({ categories, tools }) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [categoryFilter, setCategoryFilter] = useState(null);
	const [enabled, setEnabled] = useState(false); 
	const [selected, setSelected] = useState(null);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleFilters(category) {
		const params = new URLSearchParams(searchParams);

		if (category === categoryFilter) {
			params.delete("category", category);
			setCategoryFilter(null);
		} else {
			params.set("category", category);
		}

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
										<div className="px-2">
											<SearchField />
										</div>

										<h3 className="sr-only">Kategorien</h3>
										<ul
											role="list"
											className="px-2 py-3 font-medium text-gray-900"
										>
											{categories.map((category) => (
												<li key={category.name}>
													<a href={category.href} className="block px-2 py-3">
														{category.name}
													</a>
												</li>
											))}
										</ul>
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
														<a
															href={option.href}
															className={classNames(
																option.current
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																open ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm"
															)}
														>
															{option.name}
														</a>
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
								{/* <h3 className="sr-only">Kategorien</h3>
								<ul
									role="list"
									className="pb-6 space-y-4 text-sm text-gray-900 border-b border-gray-200"
								>
									{categories.map((category) => (
										<li key={category.name}>
											<button
												type="button"
												onClick={() => {
													setCategoryFilter(category.name);
													handleFilters(category.name);
												}}
											>
												{categoryFilter == category.name ? (
													<p className="fond-bold">{category.name}</p>
												) : (
													<p className="fond-meldium">{category.name}</p>
												)}
											</button>
										</li>
									))}
								</ul> */}
								<div className="w-full">
									<div className="w-full max-w-md mx-auto">
										<RadioGroup
											by="name"
											value={selected}
											onChange={setSelected}
											aria-label="Server size"
											className="space-y-2"
										>
											{categories.map((category) => (
												<Radio
													key={category.name}
													value={category}
													className="group relative flex cursor-pointer rounded-lg bg-green/5   transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10 data-[checked]:font-semibold"
												>
													<div className="flex items-center justify-between w-full">
														<div className="text-sm/6">
															<button
																type="button"
																onClick={() => {
																	setCategoryFilter(category.name);
																	handleFilters(category.name);
																}}
															>
																<p className="text-sm text-gray-900">
																	{category.name}
																</p>
															</button>
														</div>
													</div>
												</Radio>
												
											))}<Radio>clear</Radio>
										</RadioGroup>
									</div>
								</div>
								<div className="pb-6 space-y-4 border-b border-gray-200">
									<Field className="flex items-center gap-2">
										<Checkbox
											checked={enabled}
											onChange={setEnabled}
											className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
										>
											<svg
												className="stroke-white opacity-0 group-data-[checked]:opacity-100"
												viewBox="0 0 14 14"
												fill="none"
											>
												<path
													d="M3 8L6 11L11 3.5"
													strokeWidth={2}
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</Checkbox>
										<Label>Favoriten</Label>
									</Field>
								</div>
							</form>

							{/* Product grid */}
							<div className="lg:col-span-3">
								<ToolGrid tools={tools} />
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
