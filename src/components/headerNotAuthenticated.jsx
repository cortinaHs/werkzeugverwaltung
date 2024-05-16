"use client"
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {Bars3Icon, XMarkIcon, WrenchScrewdriverIcon} from "@heroicons/react/24/outline";
import { SignInButton, SignUpButton } from "./buttons";


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function HeaderNotAuthenticated() {
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
						<WrenchScrewdriverIcon className="w-8 h-8 stroke-green-600" />
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
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<SignUpButton />
					<SignInButton />
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
							<WrenchScrewdriverIcon className="w-8 h-8 stroke-green-600" />
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
							</div>
							<div className="py-6">
								<SignUpButton />
								<br />
								<SignInButton />
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}