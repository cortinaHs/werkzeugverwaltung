import NextAuth, { CredentialsSignin } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod.js";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/client.js";

const bcrypt = require("bcrypt");

class InvalidLoginError extends CredentialsSignin {
	code = message;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	pages: { signIn: "/signin" },

	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			// TODO: handle errors with formState

			authorize: async (credentials) => {
				try {
					const { email, password } = await signInSchema.parseAsync(
						credentials
					);
					// verify user
					const user = await prisma.user.findUnique({
						where: { email: email },
					});
					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						throw new InvalidLoginError("Bitte überprüfe dein Passwort.");
					}
					if (!user) {
						throw new Error("User not found.");
					}
					// return json object with the user data
					console.log(user);
					return user;
				} catch (error) {
					console.log(error);
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						console.log(error.path[0]);
						return error;
					}
				}
			},
		}),
	],
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			prisma.session.create({
				data: { userId: user.id },
			});
			console.log(session);
			return session;
		},
	},
});
