"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const SignInButton = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signIn()}>
			Sign in
		</button>
	);
};

export const SignUpButton = () => {
	return (
		<Link href="/signup" style={{ marginRight: 10 }}>
			Register
		</Link>
	);
};

export const SignOutButton = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signOut()}>
			Sign Out
		</button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};


// TODO: Add button styles from tailwind