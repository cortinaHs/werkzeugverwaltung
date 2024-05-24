"use client";
import Datepicker from "tailwind-datepicker-react";
import { useState, useEffect } from "react";
import {
	CalendarIcon,
	ChevronDoubleRightIcon,
	ChevronDoubleLeftIcon,
	XMarkIcon
} from "@heroicons/react/24/outline";

const options = {
	title: "Mietzeitraum wählen",
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	clearBtnText: "Löschen",
	todayBtnText: "Heute",
	maxDate: new Date("2030-01-01"),
	minDate: new Date(),
	theme: {
		background: "bg-white",
		todayBtn: "bg-green-600",
		clearBtn: "",
		icons: "",
		text: "text-grey-900",
		disabledText: "bg-neutral-100",
		input: "",
		inputIcon: "",
		selected: "bg-green-600",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <ChevronDoubleLeftIcon className="w-3 h-3" />,
		next: () => <ChevronDoubleRightIcon className="w-3 h-3" />,
	},
	datepickerClassNames: "fixed, top-20",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric",
	},
};

export function SetDate() {
	const [showFrom, setShowFrom] = useState(false);
	const [showTo, setShowTo] = useState(false);
	const [selectedFromDate, setSelectedFromDate] = useState("");
	const [selectedToDate, setSelectedToDate] = useState("");

	// useEffect(() => {
	// 	// window.addEventListener("click", (e) => {
	// 	// 	const target = e.target;
	// 	// 	if (!document.getElementById(container_id)?.contains(target)) {
	// 	// 		setShowFrom(false);
	// 	// 		setShowTo(false);
	// 	// 	}
	// 	// 	console.log(target);
	// 	// });
	// 	const dp = document.getElementById('dp');
	// 	dp.addEventListener("", () => {
	// 				setShowFrom(false);
	// 				setShowTo(false);
	// 	})
		
	// });

	const handleChangeFromDate = (selectedFromDate) => {
		let day = selectedFromDate.getDate();
		let month = selectedFromDate.getMonth() + 1;
		let year = selectedFromDate.getFullYear();

		let currentDate = `${day}-${month}-${year}`;
		setSelectedFromDate(currentDate);
	};
	const handleChangeToDate = (selectedToDate) => {
		let day = selectedToDate.getDate();
		let month = selectedToDate.getMonth() + 1;
		let year = selectedToDate.getFullYear();

		let currentDate = `${day}-${month}-${year}`;
		setSelectedToDate(currentDate);
	};

	const handleCloseFrom = (state) => {
		setShowFrom(state);
	};
	const handleCloseTo = (state) => {
		setShowTo(state);
	};

	return (
		<div id="dp" onClick={() => { handleCloseFrom; handleCloseTo;}}>
			<Datepicker
				options={options}
				onChange={handleChangeFromDate}
				show={showFrom}
				setShow={handleCloseFrom}
			>
				<div className="relative max-w-sm">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<CalendarIcon className="w-4 h-4" />
					</div>
					<input
						type="text"
						className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
						placeholder="Datum wählen"
						value={selectedFromDate}
						onFocus={() => setShowFrom(true)}
						readOnly
					/>
				</div>
			</Datepicker>
			<span className="mx-4 text-gray-500">bis</span>
			<Datepicker
				options={() => {
					options["minDate"] = selectedFromDate;
					return options;
				}}
				onChange={handleChangeToDate}
				show={showTo}
				setShow={handleCloseTo}
			>
				<div className="relative max-w-sm">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<CalendarIcon className="w-4 h-4" />
					</div>
					<input
						type="text"
						className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
						placeholder="Datum wählen"
						value={selectedToDate}
						onFocus={() => setShowTo(true)}
						readOnly
					/>
				</div>
			</Datepicker>
		</div>
	);
}
