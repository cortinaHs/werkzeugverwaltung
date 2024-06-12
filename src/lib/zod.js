import { z } from "zod";
import { object, string } from "zod";

export const signInSchema = object({
	email: string({ required_error: "E-Mail ist erforderlich" })
		.min(1, "E-Mail ist erforderlich")
		.email("Ungültige E-Mail"),
	password: string({ required_error: "Passwort ist erforderlich" })
		.min(1, "Passwort ist erforderlich")
		.min(8, "Passwort muss mehr als 8 Zeichen lang sein")
		.max(32, "Passwort darf nicht länger als 32 Zeichen sein"),
});

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name muss mindestens 2 Zeichen lang sein." })
		.trim(),
	email: z
		.string()
		.email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." })
		.trim(),
	password: z
		.string()
		.min(8, { message: "Mindestens 8 Zeichen lang sein" })
		.regex(/[a-zA-Z]/, {
			message: "Mindestens einen Buchstaben enthalten.",
		})
		.regex(/[0-9]/, {
			message: "Mindestens eine Zahl enthalten.",
		})
		.regex(/[^a-zA-Z0-9]/, {
			message: "Mindestens ein Sonderzeichen enthalten.",
		})
		.trim(),
});

export const ToolRegistrationSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name muss mindestens 2 Zeichen lang sein." })
		.trim(),
	category: z.string().min(1, { message: "Kategorie ist erforderlich." }),
	description: z
		.string()
		.min(2, { message: "Beschreibung muss mindestens 2 Zeichen lang sein." })
		.trim(),
});

export const EditProfileSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name muss mindestens 2 Zeichen lang sein." })
		.trim(),
	email: z
		.string()
		.email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." })
		.trim(),
});
