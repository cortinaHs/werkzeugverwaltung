"use client"

import { ProfileButton, SignInButton, SignOutButton, SignUpButton } from "./authbuttons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
	Bars3Icon,
	XMarkIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}


export function CustomHeader() {
		const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
		const { data: session } = useSession();
		const user = session?.user;

		return (
			<header className="bg-white">
				<nav
					className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<Link href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Neighbortool</span>
							<WrenchScrewdriverIcon className="w-8 h-8 stroke-green-600" />
						</Link>
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
					{user ? (
						<>
							<div className="relative hidden lg:flex lg:gap-x-12">
								<Link
									href="/search"
									className="text-sm font-semibold leading-6 text-gray-900"
								>
									Gerätesuche
								</Link>
								<Link
									href="/favorites"
									className="text-sm font-semibold leading-6 text-gray-900"
								>
									Favoriten
								</Link>
								<Link
									href="/toolregistration"
									className="text-sm font-semibold leading-6 text-gray-900"
								>
									Gerät hinzufügen
								</Link>
							</div>
							<div className="hidden lg:flex lg:flex-1 lg:justify-end">
								<ProfileButton />
								<SignOutButton />
							</div>
						</>
					) : (
						<div className="hidden lg:flex lg:flex-1 lg:justify-end">
							<SignUpButton />
							<SignInButton />
						</div>
					)}
				</nav>
				<Dialog
					className="lg:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-10" />
					<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Neighbortool</span>
								<WrenchScrewdriverIcon className="w-8 h-8 stroke-green-600" />
							</Link>
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
							{user ? (
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="py-6 space-y-2">
										<Link
											href="/suche"
											className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
										>
											Gerätesuche
										</Link>
										<Link
											href="/favorites"
											className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
										>
											Favoriten
										</Link>
										<Link
											href="/toolregistration"
											className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
										>
											Gerät hinzufügen
										</Link>
									</div>
									<div className="py-6">
										<ProfileButton />
										<br />
										<SignOutButton />
									</div>
								</div>
							) : (
								<div className="py-6">
									<SignUpButton />
									<br />
									<SignInButton />
								</div>
							)}
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		);
	}
