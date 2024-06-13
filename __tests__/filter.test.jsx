import { render, screen, fireEvent } from "@testing-library/react";
import { SearchFilter } from "../src/app/search/filter";

describe("SearchFilter", () => {
	const categories = [
		{ id: 1, name: "Category 1" },
		{ id: 2, name: "Category 2" },
	];

	const tools = [
		{ id: 1, name: "Tool 1" },
		{ id: 2, name: "Tool 2" },
	];

	const favorites = [1];

	const redirecttoolregistration = jest.fn();

	beforeEach(() => {
		render(
			<SearchFilter
				categories={categories}
				tools={tools}
				favorites={favorites}
				redirecttoolregistration={redirecttoolregistration}
			/>
		);
	});

	it("renders the filter component", () => {
		expect(screen.getByText("Filter")).toBeInTheDocument();
	});

	it("renders the search field", () => {
		expect(screen.getByLabelText("Search")).toBeInTheDocument();
	});

	it("renders the favorites checkbox", () => {
		expect(screen.getByLabelText("Favorites")).toBeInTheDocument();
	});

	it("renders the category selection", () => {
		expect(screen.getByLabelText("Categories")).toBeInTheDocument();
	});

	it("renders the date picker with range", () => {
		expect(screen.getByLabelText("Date Range")).toBeInTheDocument();
	});

	it("renders the sort options menu", () => {
		expect(screen.getByText("Sortieren")).toBeInTheDocument();
	});

	it("calls the redirecttoolregistration function when 'Geräte hinzufügen' button is clicked", () => {
		fireEvent.click(screen.getByText("Geräte hinzufügen"));
		expect(redirecttoolregistration).toHaveBeenCalled();
	});
});
