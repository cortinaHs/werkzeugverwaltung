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

export function CategoryTable({ categories, deleteCategory, addCategory }) {
	const [formStateAdd, addAction] = useFormState(addCategory, undefined);
	const [formStateDelete, deleteAction] = useFormState(
		deleteCategory,
		undefined
	);

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
										<TableCell className="w-full text-base font-medium">
											<form
												action={deleteAction}
												className="flex items-center justify-between"
											>
												<p>{category.name}</p>
												<input
													className="hidden"
													readOnly
													name="categoryId"
													type="categoryId"
													id="categoryId"
													value={category.id}
												></input>
												<Button type="submit" variant="outline" size="icon">
													<XMarkIcon className="w-3 h-3" />
												</Button>
											</form>
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
							</form>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
}
