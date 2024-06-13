"use client";
import { Button } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconActive } from "@heroicons/react/20/solid";
import { updateFavorites, updateReservations } from "../../app/search/actions";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { ExclamationCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";

export function ToolGrid({ tools, favorites }) {
	function handleFavorites(toolid) {
		updateFavorites(toolid);
	}
	const [date, setDate] = useState(undefined);
	const [formState, formAction] = useFormState(updateReservations, null);
	const defaultphoto =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";

	return (
		<div className="bg-white">
			<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				{tools.map((tool) => (
					<div key={tool.id}>
						<div className="relative group">
							<div className="w-full overflow-hidden rounded-md bg-stone-300 aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
								{tool.photo && tool.imgtype ? (
									<img
										src={
											"data:" +
											tool.imgtype +
											";base64, " +
											tool.photo.toString()
										}
										alt={tool.name}
										className="object-cover object-center w-full h-full lg:h-full lg:w-full"
									/>
								) : (
									<img
										src={defaultphoto}
										alt="default photo"
										className="object-cover object-center w-full h-full lg:h-full lg:w-full"
									/>
								)}
							</div>
							<div className="flex justify-between mt-4 space-x-5">
								<div>
									<h3 className="text-sm text-gray-700">{tool.name}</h3>
									<br />
									<Dialog>
										<DialogTrigger asChild>
											<Button className="rounded bg-green-600 py-2 px-4 text-xs text-white data-[hover]:bg-green-500 data-[active]:bg-green-700">
												Jetzt reservieren
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[425px]">
											<form action={formAction} className="space-y-8">
												<DialogHeader>
													<DialogTitle>
														Jetzt {tool.name} reservieren
													</DialogTitle>
													<DialogDescription>
														{tool.description}
													</DialogDescription>
												</DialogHeader>

												<Calendar
													// initialFocus
													mode="range"
													defaultMonth={date?.from}
													selected={date}
													onSelect={setDate}
													numberOfMonths={1}
													disabled={(date) =>
														date < new Date() || date > addDays(new Date(), 365)
													}
												/>
												<input type="hidden" name="toolId" value={tool.id} />
												<input
													type="hidden"
													name="dateFrom"
													value={date?.from}
												/>
												<input type="hidden" name="dateTo" value={date?.to} />
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

													<Button type="submit">Reservieren</Button>
												</DialogFooter>
											</form>
										</DialogContent>
									</Dialog>
								</div>
								<button
									className="self-start"
									type="button"
									onClick={() => handleFavorites(tool.id)}
								>
									{favorites?.includes(tool.id) ? (
										<StarIconActive className="w-5 h-5" />
									) : (
										<StarIcon className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
