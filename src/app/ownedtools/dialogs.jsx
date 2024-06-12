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
import { useFormState } from "react-dom";
import { PhotoUploader } from "@/components/photoUploader"
import { CategorySelector } from "@/components/categorySelector";

;
	export function ToolActionDialogs({ tool, handleEdit, handleDelete, categories }) {
		const [formState, formAction] = useFormState(handleEdit, undefined);

		return (
			<div className="flex items-center justify-end mt-6 gap-x-6">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Gerät Bearbeiten</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Gerät Bearbeiten</DialogTitle>
						</DialogHeader>
						<form action={formAction}>
							<div className="grid gap-4 py-4">
								<input type="hidden" name="id" value={tool.id} />
								<div >
									<Label htmlFor="name" className="text-right">
										Name*
									</Label>
									<Input
										required
										id="name"
										name="name"
										type="name"
										placeholder={tool.name}
										className="relative mt-2"
									/>
								</div>
								{formState?.errors.name && (
									<p className="block text-sm italic text-red-600">
										{formState.errors.name}
									</p>
								)}

								<div>
									<Label htmlFor="email" className="text-right">
										Beschreibung*
									</Label>

									<Input
										required
										id="description"
										name="description"
										type="description"
										placeholder={tool.description}
										className="relative mt-2"
									/>
								</div>
								{formState?.errors.description && (
									<p className="block text-sm italic text-red-600">
										{formState.errors.description}
									</p>
								)}
								<CategorySelector
									categories={categories}
									formState={formState}
								/>
								<PhotoUploader />
							</div>
							<DialogFooter>
								<Button type="submit">Speichern</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<AlertDialog>
					<AlertDialogTrigger>
						<Button variant="outline">Gerät Löschen</Button>
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
							<AlertDialogAction onClick={() => handleDelete(tool.id)}>
								Gerät Löschen
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		);
	}