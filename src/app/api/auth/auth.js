import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password";
import { getUserFromDb } from "@/utils/db";

export const { handlers, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					let user = null;

					const { email, password } = await signInSchema.parseAsync(
						credentials
					);

					// logic to salt and hash password
					const pwHash = saltAndHashPassword(password);

					// logic to verify if user exists
					user = await getUserFromDb(email, pwHash);

					if (!user) {
						throw new Error("User not found.");
					}

					// return json object with the user data
					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						return null;
					}
				}
			},
		}),
	],
});
