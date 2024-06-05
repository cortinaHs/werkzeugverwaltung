"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { Button } from "@/components/ui/button";
import { Button as LinkButton } from "@headlessui/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function ReservationsPage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const tools = await prisma.tool.findMany({
		where: {
			ownerId: user,
		},
		orderBy: {
			name: "asc",
		},
	});

	async function handleDelete(data) {
		"use server";
		const id = Number(data.get("toolId"));
		if (id) {
			const deleteTool = await prisma.tool.delete({
				where: {
					id: id,
				},
			});
			revalidatePath("/ownedtools", "ownedtools");
		}
    }
    
    async function redirecttoolregistration(data) {
        "use server";
        redirect("/toolregistration");
    }
	//TODO:  Update
	const defaultphoto ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";


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
									src={"data:" + tool.imgtype + ";base64, " + tool.photo.toString()}
									alt=""
								/>) : (<img
									className="flex-none w-12 h-12 rounded-full bg-gray-50"
									src={defaultphoto}
									alt="default photo"
								/>)
							}
								<div className="flex-auto min-w-0">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										{tool.name}
									</p>
									<p className="mt-1 text-xs leading-5 text-gray-500 truncate">
										{tool.description}
									</p>
								</div>
							</div>
							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<form action={handleDelete}>
									<input
										name="toolId"
										className="hidden"
										value={tool.id}
										readOnly
									/>

									<Button variant="secondary" type="submit">
										Gerät löschen
									</Button>
								</form>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
