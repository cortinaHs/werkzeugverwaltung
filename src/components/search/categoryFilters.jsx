"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {Radio,
	RadioGroup,
} from "@headlessui/react";
import {useState } from "react";

export function CategorySelection({categories}) {
    const [selected, setSelected] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    function handleFilters(category) {
        const params = new URLSearchParams(searchParams);

        if (category === categoryFilter) {
            params.delete("category", category);
            setCategoryFilter(null);
        } else if (category === undefined) {
            params.delete("category", category);
        } else {
            params.set("category", category);
        }

        replace(`${pathname}?${params.toString()}`);
    }
        
        return (

							<RadioGroup
								by="name"
								value={selected}
								onChange={setSelected}
								aria-label="Server size"
								className="space-y-2"
							>
								{categories.map((category) => (
									<Radio
										key={category.name}
										value={category}
										className="group relative flex cursor-pointer rounded-lg bg-green/5   transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10 data-[checked]:font-semibold"
									>
										<div className="flex items-center justify-between w-full">
											<div className="text-sm/6">
												<button
													type="button"
													onClick={() => {
														setCategoryFilter(category.name);
														handleFilters(category.name);
													}}
												>
													<p className="text-sm text-gray-900">
														{category.name}
													</p>
												</button>
											</div>
										</div>
									</Radio>
								))}
								<div className="relative ">
									<div className="absolute inset-y-0 right-0 text-xs ">
										<Radio
											key={null}
											value={null}
											className="group relative flex cursor-pointer rounded-lg bg-green/5   transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
										>
											<button
												type="button"
												onClick={() => {
													setCategoryFilter(null);
													handleFilters(undefined);
												}}
											>
												<p className="text-xs text-gray-900">Alle anzeigen</p>
											</button>
										</Radio>
									</div>
								</div>
							</RadioGroup>

				);
    }