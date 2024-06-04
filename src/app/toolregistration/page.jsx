"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";

import { ToolrestrationForm } from "./form";

export default async function toolregistrationPage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const categories = await prisma.category.findMany()

	async function registertool(data) {
		"use server";
		console.log(data);
	}

	

	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Gerät registrieren
				</h1>
			</div>
			<ToolrestrationForm registertool={registertool} categories={categories} />
		</main>
	);
}
