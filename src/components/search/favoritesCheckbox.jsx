"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Checkbox, Label, Field } from "@headlessui/react";
import { useState } from "react";

export function FavoritesCheckbox() {
	const [enabled, setEnabled] = useState(false);

	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	function handleCheck() {
        const params = new URLSearchParams(searchParams);

        if (!enabled) {
            setEnabled(true);
            params.set("favorites", true);

        } else {
            setEnabled(false);
			params.delete("favorites");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<Field className="flex items-center gap-2">
			<Checkbox
				checked={enabled}
				onChange={handleCheck}
				className="group block size-4 rounded border bg-white data-[checked]:bg-stone-900"
			>
				<svg
					className="stroke-white opacity-0 group-data-[checked]:opacity-100"
					viewBox="0 0 14 14"
					fill="none"
				>
					<path
						d="M3 8L6 11L11 3.5"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Checkbox>
			<Label>Favoriten</Label>
		</Field>
	);
}
