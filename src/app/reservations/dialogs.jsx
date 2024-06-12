"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { useState } from "react";
import { ExclamationCircleIcon, CheckIcon } from "@heroicons/react/24/outline";

export function ReservationsDialogs({
	reservation,
	updateReservations,
	handleCancel,
}) {
	const [date, setDate] = useState(undefined);
	const [formState, formAction] = useFormState(updateReservations, null);

	return (
		<div className="flex items-center justify-end mt-6 gap-x-6">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Reservierung verlängern</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Reservierung verlängern</DialogTitle>
					</DialogHeader>
					<form action={formAction}>
						<Calendar
							// initialFocus
							mode="single"
							defaultMonth={date || new Date()}
							selected={date}
							onSelect={setDate}
							numberOfMonths={1}
							disabled={(date) =>
								date < new Date() || date > addDays(new Date(), 365)
							}
						/>
						<input type="hidden" name="reservationId" value={reservation.id} />
						<input type="hidden" name="toolId" value={reservation.tool.id} />
						<input type="hidden" name="endDate" value={reservation.endDate} />
						<input type="hidden" name="dateTo" value={date} />

						<DialogFooter>
							<div className="flex">
								{formState?.error && (
									<div className="contents">
										<ExclamationCircleIcon className="w-5 h-5 text-red-600" />
										<p className="text-sm italic font-medium leading-6 text-red-600 ">
											{formState.error}
										</p>
									</div>
								)}
							</div>
							<div className="flex">
								{formState?.success && (
									<div className="contents">
										<CheckIcon className="w-5 h-5 text-green-600" />
										<p className="text-sm italic font-medium leading-6 text-green-600 ">
											{formState.success}
										</p>
									</div>
								)}
							</div>
							<Button type="submit">Speichern</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<AlertDialog>
				<AlertDialogTrigger>
					<Button variant="outline">Reservierung stornieren</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Bist du dir absolut sicher?</AlertDialogTitle>
						<AlertDialogDescription>
							Diese Aktion kann nicht rückgängig gemacht werden.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Abbrechen</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleCancel(reservation.id)}>
							Reservierung stornieren
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
