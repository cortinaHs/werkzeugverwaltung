"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { ToolregistrationForm } from "./form";
import { ToolRegistrationSchema } from "@/lib/zod";
import { redirect } from "next/navigation";


export default async function toolregistrationPage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const categories = await prisma.category.findMany()

	const registertool = async (formState, formData) => {
		"use server"

		const validatedFields = ToolRegistrationSchema.safeParse({
			name: formData.get("name"),
			category: formData.get("categoryId"),
			description: formData.get("description"),
		});
		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		} 
	
		const { name, category, description } = validatedFields.data;
		
		const image = formData.get("file-upload")
		const imageReader = image.stream().getReader();
		const imageDataU8 = [];
		while (true) {
				const { done, value } = await imageReader.read();
				if (done) break;

				imageDataU8.push(...value);
			}

		const base64 = Buffer.from(imageDataU8).toString('base64')



		const tool = await prisma.tool.create({
			data: {
				name,
				description,
				photo: image ? base64 : "",
				imgtype: image ? image.type : "",
				categoryId: Number(category),
				ownerId: user,
			},
		});
	};

	
	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Gerät registrieren
				</h1>
			</div>
			<ToolregistrationForm handleForm={registertool} categories={categories} />
		</main>
	);
}
