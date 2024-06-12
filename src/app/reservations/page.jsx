"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Button as LinkButton } from "@headlessui/react";
import { redirect } from "next/navigation";
import { ReservationsDialogs } from "./dialogs";

export default async function ReservationsPage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const reservations = await prisma.reservation.findMany({
		where: {
			userId: user,
		},
		include: {
			tool: true,
		},
		orderBy: {
			startDate: "asc",
		},
	});

	async function handleCancel(data) {
		"use server";
		const id = data;
		console.log(id)
		if (id) {
			const cancelation = await prisma.reservation.delete({
				where: {
					id: id,
				},
			});
			revalidatePath("/reservations", "reservations");
		}
	}

	async function updateReservations(formState, formData) {
		"use server";
		const id = Number(formData.get("reservationId"));
		const toolId = Number(formData.get("toolId"));
		const dateTo = new Date(formData.get("dateTo"));
		dateTo.setDate(dateTo.getDate() + 1);
		const endDate = new Date(formData.get("endDate"));
		const reservationCheck = await prisma.reservation.findFirst({
			where: {
				toolId: toolId,
				OR: [
					{
						AND: [
							{
								startDate: { gt: endDate },
							},
							{ startDate: { lte: dateTo } },
						],
					},
					{
						AND: [{ endDate: { gt: endDate } }, { endDate: { lte: dateTo } }],
					},
				],
			},
		});

		if (!reservationCheck) {
			const updatedReservation = await prisma.reservation.update({
				where: {
					id: id,
				},
				data: {
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

	async function redirectsearch(data) {
		"use server";
		redirect("/search");
	}
	const defaultphoto =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";

	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Reservierte Geräte
				</h1>
			</div>
			{reservations.length === 0 ? (
				<div>
					<p className="py-2 text-gray-700">Keine Reservierungen vorhanden.</p>
					<form action={redirectsearch}>
						<LinkButton
							type="submit"
							className="rounded bg-green-600 py-2 px-4 text-sm text-white data-[hover]:bg-green-500 data-[active]:bg-green-700"
						>
							Geräte suchen
						</LinkButton>
					</form>
				</div>
			) : (
				<>
					<ul role="list" className="divide-y divide-gray-100 ">
						{reservations.map((reservation) => (
							<div key={reservation.id}>
								{reservation.endDate >= new Date() && (
									<li
										key={reservation.id}
										className="flex justify-between py-5 gap-x-6"
									>
										<div className="flex min-w-0 gap-x-4">
											{reservation.tool.photo && reservation.tool.imgtype ? (
												<img
													className="flex-none w-12 h-12 rounded-full bg-gray-50"
													src={
														"data:" +
														reservation.tool.imgtype +
														";base64, " +
														reservation.tool.photo.toString()
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
													{reservation.tool.name}
												</p>
												<p className="mt-1 text-xs leading-5 text-gray-500 truncate">
													{reservation.startDate.toLocaleDateString(
														"de-DE",
														options
													)}{" "}
													bis{" "}
													{reservation.endDate.toLocaleDateString(
														"de-DE",
														options
													)}
												</p>
											</div>
										</div>
										<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
											<ReservationsDialogs
												reservation={reservation}
												handleCancel={handleCancel}
												updateReservations={updateReservations}
											/>
										</div>
									</li>
								)}
							</div>
						))}
					</ul>

					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Vergangene Reservierungen
					</h2>
					<ul role="list" className="divide-y divide-gray-100 ">
						{reservations.map((reservation) => (
							<div key={reservation.id}>
								{reservation.endDate < new Date() && (
									<li className="flex justify-between py-5 gap-x-6">
										<div className="flex min-w-0 gap-x-4">
											<img
												className="flex-none w-12 h-12 rounded-full bg-gray-50"
												src={reservation.tool.photo}
												alt=""
											/>
											<div className="flex-auto min-w-0">
												<p className="text-sm font-semibold leading-6 text-gray-900">
													{reservation.tool.name}
												</p>
												<p className="mt-1 text-xs leading-5 text-gray-500 truncate">
													{reservation.startDate.toLocaleDateString(
														"de-DE",
														options
													)}{" "}
													bis{" "}
													{reservation.endDate.toLocaleDateString(
														"de-DE",
														options
													)}
												</p>
											</div>
										</div>
									</li>
								)}
							</div>
						))}
					</ul>
				</>
			)}
		</main>
	);
}
