"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { Button as LinkButton } from "@headlessui/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ToolActionDialogs } from "./dialogs";
import { ToolRegistrationSchema } from "@/lib/zod";

export default async function OwnedTools() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const categories = await prisma.category.findMany();

	const tools = await prisma.tool.findMany({
		where: {
			ownerId: user,
		},
		orderBy: {
			name: "asc",
		},
		include: {
			category: true,
		},
	});

	async function handleDelete(data) {
		"use server";
		const id = data;
		if (id) {
			const deleteTool = await prisma.tool.delete({
				where: {
					id: id,
				},
			});
			revalidatePath("/ownedtools", "ownedtools");
		}
	}

	async function handleEdit(formState, formData) {
		"use server";
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
		const id = Number(formData.get("id"));
		const image = formData.get("file-upload");
		const imageReader = image.stream().getReader();
		const imageDataU8 = [];
		while (true) {
			const { done, value } = await imageReader.read();
			if (done) break;

			imageDataU8.push(...value);
		}

		const base64 = Buffer.from(imageDataU8).toString("base64");

		const tool = await prisma.tool.update({
			where: { id: id },
			data: {
				name,
				description,
				photo: image ? base64 : "",
				imgtype: image ? image.type : "",
				categoryId: Number(category),
			},
		});
		revalidatePath("/ownedtools", "ownedtools");
	}

	async function redirecttoolregistration(data) {
		"use server";
		redirect("/toolregistration");
	}
	//TODO:  Update
	const defaultphoto =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";

	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Eigene Geräte
				</h1>
			</div>
			{tools.length === 0 ? (
				<div>
					<p className="py-2 text-gray-700">Keine Geräte vorhanden.</p>
					<form action={redirecttoolregistration}>
						<LinkButton
							type="submit"
							className="rounded bg-green-600 py-2 px-4 text-sm text-white data-[hover]:bg-green-500 data-[active]:bg-green-700"
						>
							Gerät hinzufügen
						</LinkButton>
					</form>
				</div>
			) : (
				<ul role="list" className="divide-y divide-gray-100 ">
					{tools.map((tool) => (
						<li key={tool.id} className="flex justify-between py-5 gap-x-6">
							<div className="flex min-w-0 gap-x-4">
								{tool.photo && tool.imgtype ? (
									<img
										className="flex-none w-12 h-12 rounded-full bg-gray-50"
										src={
											"data:" +
											tool.imgtype +
											";base64, " +
											tool.photo.toString()
										}
										alt=""
									/>
								) : (
									<img
										className="flex-none w-12 h-12 rounded-full bg-gray-50"
										src={defaultphoto}
										alt="default photo"
									/>
								)}
								<div className="flex-auto min-w-0">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										{tool.name}
									</p>
									<p className="mt-1 text-xs leading-5 text-gray-500 truncate">
										{tool.category.name} | {tool.description}
									</p>
								</div>
							</div>

							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<ToolActionDialogs
									tool={tool}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
									categories={categories}
								/>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
