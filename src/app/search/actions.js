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

	revalidatePath("/search", "search");
}

export async function updateReservations(prevsState, formData) {
	const session = await auth();
	const user = session.user.id;

	let dateFrom = formData.get("dateFrom");
	let dateTo = formData.get("dateTo");
	const toolid = Number(formData.get("toolId"));

	if (dateFrom && dateTo) {
		dateFrom = new Date(dateFrom);
		dateTo = new Date(dateTo);
	} else if (!dateTo) {
		dateTo = new Date(dateFrom);
		dateFrom = new Date(dateFrom);
	} else {
		return { error: "Bitte wähle ein Datum aus." };
	}

	const reservationCheck = await prisma.reservation.findFirst({
		where: {
			toolId: toolid,
			OR: [
				{
					AND: [
						{
							startDate: { gte: dateFrom },
						},
						{ startDate: { lte: dateTo } },
					],
				},
				{
					AND: [{ endDate: { gte: dateFrom } }, { endDate: { lte: dateTo } }],
				},
			],
		},
	});

	if (!reservationCheck) {
		await prisma.reservation.create({
			data: {
				userId: user,
				toolId: toolid,
				startDate: dateFrom,
				endDate: dateTo,
			},
		});
		revalidatePath("/reservations", "reservations");
		return { success: "Werkzeug erfolgreich reserviert." };
	} else {
		return {
			error: "Dieses Werkzeug ist in diesem Zeitraum bereits reserviert.",
		};
	}
}
