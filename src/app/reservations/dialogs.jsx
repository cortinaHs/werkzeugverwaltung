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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

;
	export function Editdialog({ tool }) {
	const [formState, formAction] = useFormState(handleEdit, undefined)
 
	return (
		<div className="flex items-center justify-end mt-6 gap-x-6">
			<Dialog>
				<DialogTrigger asChild>
					<Button>Profil Bearbeiten</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Profil Bearbeiten</DialogTitle>
					</DialogHeader>
					<form action={formAction}>
						<div className="grid gap-4 py-4">
							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									required
									id="name"
									name="name"
									type="name"
									placeholder={userdata.name}
									className="col-span-3"
								/>
							</div>
							{formState?.errors.name && (
								<p className="block text-sm italic text-red-600">
									{formState.errors.name}
								</p>
							)}

							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>

								<Input
									required
									id="email"
									name="email"
									type="email"
									placeholder={userdata.email}
									className="col-span-3"
								/>
							</div>
							{formState?.errors.email && (
								<p className="block text-sm italic text-red-600">
									{formState.errors.email}
								</p>
							)}

							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="street" className="text-right">
									Straße
								</Label>
								<Input
									id="street"
									name="street"
									type="street"
									placeholder={userdata.street}
									className="col-span-3"
								/>
							</div>
							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="houseNumber" className="text-right">
									Nr.
								</Label>
								<Input
									id="houseNumber"
									name="houseNumber"
									type="houseNumber"
									placeholder={userdata.houseNumber}
									className="col-span-3"
								/>
							</div>
							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="postalCode" className="text-right">
									PLZ
								</Label>
								<Input
									id="postalCode"
									type="postalCode"
									name="postalCode"
									placeholder={userdata.postalCode}
									className="col-span-3"
								/>
							</div>
							<div className="grid items-center grid-cols-4 gap-4">
								<Label htmlFor="placeOfResidence" className="text-right">
									Stadt
								</Label>
								<Input
									id="placeOfResidence"
									type="placeOfResidence"
									name="placeOfResidence"
									placeholder={userdata.placeOfResidence}
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Speichern</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<AlertDialog>
				<AlertDialogTrigger>
					<Button variant="destructive">Profil Löschen</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Bist du dir absolut sicher?</AlertDialogTitle>
						<AlertDialogDescription>
							Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird
							dein Konto dauerhaft gelöscht und deine Daten von unseren Servern
							entfernt.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Abbrechen</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleDelete()}>
							Profil Löschen
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}