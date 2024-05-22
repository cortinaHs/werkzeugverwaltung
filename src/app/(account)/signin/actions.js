"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";


export async function authenticate(prevState, formData) {
	try {
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirectTo: "/",
		});
	} catch (error) {
		console.log(error)
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Bitte überprüfe deine Anmeldedaten.";
				default:
					return "Es ist etwas schief gelaufen.";
			}
		}

		throw error;
	}
}
