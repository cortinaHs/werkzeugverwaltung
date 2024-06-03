"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateFavorites(toolid) {
	const session = await auth();
	const user = session.user.id;

	const favorite = await prisma.favorite.findUnique({
		where: {
			userId_toolId: {
				userId: user,
				toolId: toolid,
			},
		},
	});


	if (favorite) {
		await prisma.favorite.delete({
			where: {
				userId_toolId: {
					userId: user,
					toolId: toolid,
				},
			},
		});
	} else {
		await prisma.favorite.create({
			data: {
				userId: user,
				toolId: toolid,
			},
		});
    }
    
    revalidatePath("/search", "search")
}
