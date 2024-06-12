"use client";
import { XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
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

export function CategoryTable({ categories, deleteCategory, addCategory }) {
	const [formStateAdd, addAction] = useFormState(addCategory, undefined);

	return (
		<>
			<Table className="w-2/3 p-4">
				<TableCaption>
					Liste aller Kategorien für Gartengeräte und Werkzeuge.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Kategoriename</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<>
						{categories ? (
							<>
								{categories.map((category) => (
									<TableRow key={category.id} className="flex justify-between">
										<TableCell className="flex justify-between w-full text-base font-medium">
											<p>{category.name}</p>
											<input
												className="hidden"
												readOnly
												name="categoryId"
												type="categoryId"
												id="categoryId"
												value={category.id}
											></input>
											<div>
												<AlertDialog>
													<AlertDialogTrigger>
														<Button size="icon" variant="outline">
															<XMarkIcon className="w-3 h-3" />
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>
																Bist du dir absolut sicher?
															</AlertDialogTitle>
															<AlertDialogDescription>
																Diese Aktion kann nicht rückgängig gemacht
																werden. Alle Geräte dieser Kategorie werden aus
																der Datenbank entfernt.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Abbrechen</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => deleteCategory(category.id)}
															>
																Kategorie Löschen
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</div>
										</TableCell>
									</TableRow>
								))}
							</>
						) : (
							<TableRow className="flex justify-between">
								<TableCell className="w-full text-sm font-medium">
									Keine Kategorien vorhanden
								</TableCell>
							</TableRow>
						)}
					</>
				</TableBody>
				<TableFooter className="flex justify-between font-medium">
					<TableRow className="flex justify-between">
						<TableCell className="w-full text-sm font-medium">
							<form action={addAction} className="flex justify-between">
								<input
									className="w-full"
									id="category"
									type="category"
									name="category"
									placeholder="Kategorie hinzufügen"
								/>

								<br />

								<Button type="submit" variant="outline" size="icon">
									<ChevronRightIcon className="w-4 h-4" />
								</Button>
								{formStateAdd?.error && (
									<p className="block text-sm italic text-red-600">
										{formStateAdd.error}
									</p>
								)}
							</form>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
}
