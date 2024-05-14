"use client"
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SignOutButton } from "./buttons";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function HeaderIsAuthenticated() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white">
			<nav
				className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<a href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Neighbortool</span>
						<svg
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
						</svg>
					</a>
				</div>

				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="w-6 h-6" aria-hidden="true" />
					</button>
				</div>
				<div className="relative hidden lg:flex lg:gap-x-12">
					<a
						href="/search"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Gerätesuche
					</a>
					<a
						href="/favorites"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Favoriten
					</a>
					<a
						href="/toolregistration"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Gerät hinzufügen
					</a>
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<SignOutButton />
				</div>
			</nav>
			<Dialog
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Neighbortool</span>
							<svg
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
							</svg>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="w-6 h-6" aria-hidden="true" />
						</button>
					</div>
					<div className="flow-root mt-6">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6 space-y-2">
								<a
									href="/suche"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Gerätesuche
								</a>
								<a
									href="/favorites"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Favoriten
								</a>
								<a
									href="/toolregistration"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Gerät hinzufügen
								</a>
							</div>
							<div className="py-6">
								<SignOutButton />
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}

// TODO: Navbar not signedin
