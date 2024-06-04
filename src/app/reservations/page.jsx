"use server";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

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
        const id = Number(data.get("reservationId"));
        if (id) {
            const cancelation = await prisma.reservation.delete({
                where: {
                    id: id,
                },
            });
            revalidatePath("/reservations", "reservations");
        }
    }

	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Reservierte Geräte
				</h1>
			</div>
			{reservations.length === 0 ? (
				<p className="text-gray-700">Keine Reservierungen vorhanden.</p>
			) : (
				<ul role="list" className="divide-y divide-gray-100 ">
					{reservations.map((reservation) => (
						<li
							key={reservation.id}
							className="flex justify-between py-5 gap-x-6"
						>
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
										{reservation.startDate.toLocaleDateString("de-DE", options)}{" "}
										bis{" "}
										{reservation.endDate.toLocaleDateString("de-DE", options)}
									</p>
								</div>
							</div>
							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<form action={handleCancel}>
									<input
										name="reservationId"
										className="hidden"
										value={reservation.id}
										readOnly
									/>

									<Button variant="secondary" type="submit">
										Reservierung stornieren
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
