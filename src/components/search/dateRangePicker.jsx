"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({ className }) {
	const [date, setDate] = useState({
		// from: new Date(),
		// to: addDays(new Date(), 2),
	});

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleDateFilters() {
        const params = new URLSearchParams(searchParams);


        if (!date) {
            params.delete("datefrom");
            params.delete("dateto");
        } else if (date.from && !date.to) {
            params.set("datefrom", format(date.from, "yyyy-MM-dd"));
            params.set("dateto", format(date.from, "yyyy-MM-dd"));
        } else {
            params.set("datefrom", format(date.from, "yyyy-MM-dd"));
		    params.set("dateto", format(date.to, "yyyy-MM-dd"));
		}

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							" justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="w-4 h-4 mr-2" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Reservierungszeitraum</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
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
				</PopoverContent>
			</Popover>

			<Button type="button"  onClick={() => handleDateFilters()}>
				Verfügbarkeit prüfen
			</Button>
		</div>
	);
}
