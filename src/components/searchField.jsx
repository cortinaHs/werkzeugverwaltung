"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchField() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleSearch(term) {
		const params = new URLSearchParams(searchParams);
		if (term === null) {
			params.set("")
		}
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		} 
		replace(`${pathname}?${params.toString()}`);
	}


	return (
		<div className="relative mt-2 rounded-md shadow-sm">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<MagnifyingGlassIcon className="w-3 h-3" />
			</div>
			<input
				type="text"
				name="searchparams"
				id="searchparams"
				className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
				placeholder="Suche"
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
			<div className="absolute inset-y-0 right-0 flex items-center">
				<label htmlFor="search" className="sr-only">
					Suche
				</label>
			</div>

			<button
				className="absolute inset-y-0 flex items-center pl-3 pointer-events-auto right-3"
				onClick={(e) => {
					handleSearch(null);
				}}
			>
				<XMarkIcon className="w-3 h-3" />
			</button>
		</div>
	);
}
