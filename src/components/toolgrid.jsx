"use client"
import { Button } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconActive } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

export function ToolGrid({tools}) {

	const pathname = usePathname();
	
	return (
		<div className="bg-white">
			{/* <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"> */}
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
									<h3 className="text-sm text-gray-700">
										<a href="/">
											<span aria-hidden="true" className="absolute inset-0" />
											{tool.name}
										</a>
									</h3>
									{/* <p className="mt-1 text-xs text-gray-500">
										{tool.description}
									</p> */}{" "}
									<br />
									{pathname === "/search" ? (
										<Button className="rounded bg-green-600 py-2 px-4 text-xs text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
											Jetzt reservieren
										</Button>) : (
										<Button className="rounded bg-green-600 py-2 px-4 text-xs text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
											Reservierung stornieren
										</Button>
									)}
								</div>
								
									<StarIcon className="w-5 h-5"/>
									{/* <StarIconActive/> */}

							</div>
						</div>
					))}
				</div>
			</div>
		// </div>
	);

	// return (
	// 	<div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
	// 		<div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
	// 			<h1 className="mb-6 text-3xl font-bold text-center">
	// 				Verfügbare Geräte
	// 			</h1>
	// 			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	// 				{tools.map((tool) => (
	// 					<div key={tool.id} className="p-4 bg-white rounded-lg shadow-md">
	// 						<img
	// 							src={`/${tool.photo}`}
	// 							alt={tool.name}
	// 							className="object-cover w-full h-48 mb-4 rounded-md"
	// 						/>
	// 						<h2 className="mb-2 text-xl font-bold text-gray-900">
	// 							{tool.name}
	// 						</h2>
	// 						<p className="mb-4 text-gray-700">{tool.description}</p>
	// 						<button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
	// 							Jetzt reservieren
	// 						</button>
	// 					</div>
	// 				))}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}
