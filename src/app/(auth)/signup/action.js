"use server";
import { SignupFormSchema } from "../../lib/zod";
import { prisma } from "../../lib/prisma";
import { signIn } from "@/app/auth";

const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");

export async function signUp(formState, formData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});
	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	// Insertion into database
	const { name, email, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
	} catch (e) {
		// handle unique email constraint
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				return {	
					errors: "Es gibt bereits einen Account mit dieser Email.",
				};
			}
		}
		throw e;
	};
	
	await signIn("credentials", {
		email: email,
		password: password,
		redirectTo: "/",
	});

}
