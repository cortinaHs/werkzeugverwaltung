"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const SignInButton = () => {
	return (
		<button
			className="mx-1 text-sm font-semibold leading-6 text-gray-900"
			onClick={() => signIn()}
		>
			Anmelden
		</button>
	);
};

export const SignUpButton = () => {
	return (
		<Link
			href="/signup"
			className="mx-1 text-sm font-semibold leading-6 text-gray-900"
		>
			Registrieren
		</Link>
	);
};

export const SignOutButton = () => {
	return (
		<button
			className="mx-1 text-sm font-semibold leading-6 text-gray-900"
			onClick={() => signOut()}
		>
			Abmelden
		</button>
	);
};

export const ProfileButton = () => {
	return (
		<Link
			href="/profile"
			className="mx-1 text-sm font-semibold leading-6 text-gray-900"
		>
			Profile
		</Link>
	);
};
