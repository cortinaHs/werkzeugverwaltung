"use client";
import { Button } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconActive } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { updateFavorites } from "../../app/search/actions";
import { useEffect } from "react";

export function ToolGrid({ tools, favorites }) {
	const pathname = usePathname();

	function handleFavorites(toolid) {
		updateFavorites(toolid);
	}

	return (
		<div className="bg-white">
			<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				{tools.map((tool) => (
					<div key={tool.id} className="relative group">
						<div className="w-full overflow-hidden rounded-md bg-stone-300 aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
							<img
								src={tool.photo}
								alt={tool.name}
								className="object-cover object-center w-full h-full lg:h-full lg:w-full"
							/>
						</div>
						<div className="flex justify-between mt-4 space-x-5">
							<div>
								<h3 className="text-sm text-gray-700">{tool.name}</h3>
								{/* <p className="mt-1 text-xs text-gray-500">
										{tool.description}
									</p> */}{" "}
								<br />
								{pathname === "/search" ? (
									<Button className="rounded bg-green-600 py-2 px-4 text-xs text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
										Jetzt reservieren
									</Button>
								) : (
									<Button className="rounded bg-green-600 py-2 px-4 text-xs text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
										Reservierung stornieren
									</Button>
								)}
							</div>
							<button
								className="self-start"
								type="button"
								onClick={() => handleFavorites(tool.id)}
							>
								{favorites?.includes(tool.id) ? 
									<StarIconActive className="w-5 h-5" />
								: 
									<StarIcon className="w-5 h-5" />
								}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);

}
