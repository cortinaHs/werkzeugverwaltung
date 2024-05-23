"use client";
import { Fragment } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	MenuItem,
	MenuItems,
	MenuButton,
	Menu,
	Transition,
} from "@headlessui/react";
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function NavNotAuthenticated() {

    const navigation = [
	{ name: "Anmelden", href: "/signin", current: false },
	{ name: "Registrieren", href: "/signup", current: false },
    ];
    
	return (
		<Disclosure as="nav" className="sticky inset-x-0 top-0 bg-stone-300 ">
			{({ open }) => (
				<>
					<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block w-6 h-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block w-6 h-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
							<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
								<div className="flex items-center flex-shrink-0">
									<Link href="/" className="-m-1.5 p-1.5">
										<span className="sr-only">Neighbortool</span>
										<WrenchScrewdriverIcon className="w-8 h-8 stroke-green-600" />
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-neutral-800 text-white"
														: "text-white hover:bg-neutral-600 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<DisclosurePanel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-neutral-800 text-white"
											: "text-white hover:bg-neutral-600 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
