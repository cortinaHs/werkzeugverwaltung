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
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function NavAuthenticated({ navigation }) {
	const pathname = usePathname();
	navigation.forEach((element) => {
		if (element.href === pathname) {
			element.current = true;
		} else {
			element.current = false;
		}
	});

	return (
		<Disclosure as="nav" className="fixed inset-x-0 top-0 z-10 bg-stone-300">
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
							<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
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
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* <button
									type="button"
									className="relative p-1 text-white rounded-full bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neural-700"
								>
									<span className="absolute -inset-1.5" />
									<span className="sr-only">View notifications</span>
									<BellIcon className="w-6 h-6" aria-hidden="true" />
								</button> */}

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="relative p-1 text-white rounded-full bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neural-700">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<UserIcon className="w-6 h-6" aria-hidden="true" />
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
										<MenuItems className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<MenuItem>
												{({ open }) => (
													<Link
														href="/userprofile"
														className={classNames(
															open ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Profil
													</Link>
												)}
											</MenuItem>
											<MenuItem>
												{({ open }) => (
													<Link
														href="/ownedtools"
														className={classNames(
															open ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Eigene Geräte
													</Link>
												)}
											</MenuItem>
											<MenuItem>
												{({ open }) => (
													<button
														onClick={() => {
															signOut();
															redirect("/");
														}}
														className={classNames(
															open ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Abmelden
													</button>
												)}
											</MenuItem>
										</MenuItems>
									</Transition>
								</Menu>
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
