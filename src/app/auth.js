import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/zod.js";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma.js";
import { revalidatePath } from "next/cache";

const bcrypt = require("bcrypt");

export const BASE_PATH = "/api/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/signin",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			
			async authorize(credentials) {
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
					if (match) {
						return user;
					} else {
						throw new InvalidLoginError("Bitte überprüfe dein Passwort.");
					}
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt({ token, user }) {

			if (user) {
				// User is available during sign-in
				if (user.role) {
					token.role = user.role;
				}
				token.id = user.id;
			}
			return token;
		},
		session ({ session, token }) {
			session.user.id = token.id;
			if (token.role) {
				session.user.role = token.role;
			}

			return session;
		},
	},
	basePath: BASE_PATH,
	secret: process.env.AUTH_SECRET,
});
