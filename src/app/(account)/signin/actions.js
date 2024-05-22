"use server"

import { signIn, auth } from "@/app/auth";
import { AuthError } from "next-auth"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function authenticate(prevState, formData) {
    try {
        await signIn("credentials", {
					email: formData.get("email"),
					password: formData.get("password"),
					redirectTo: "/",
				});
        
        
    } catch (error) {
        // if (error instanceof CredentialsSignin) {
		// 			switch (error.code) {
		// 				case "custom_error":
		// 					return "Anmeldedaten inkorrekt.";
		// 				default:
		// 					return "Es ist etwas schief gelaufen.";
		// 			}
		// 		}
        throw error;
    }
}