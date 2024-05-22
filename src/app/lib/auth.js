import NextAuth, { CredentialsSignin } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod.js";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma.js";

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
					if (!user) {
						throw new Error("User not found.");
					}
					// verify password
					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						throw new InvalidLoginError("Bitte überprüfe dein Passwort.");
					}

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


// callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           randomKey: token.randomKey,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//           randomKey: u.randomKey,
//         };
//       }
//       return token;