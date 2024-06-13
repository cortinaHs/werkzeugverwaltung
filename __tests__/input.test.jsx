import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryTable } from "../src/app/admin/input";

describe("CategoryTable", () => {
	const categories = [
		{ id: 1, name: "Category 1" },
		{ id: 2, name: "Category 2" },
		{ id: 3, name: "Category 3" },
	];

	const deleteCategory = jest.fn();
	const addCategory = jest.fn();

	beforeEach(() => {
		render(
			<CategoryTable
				categories={categories}
				deleteCategory={deleteCategory}
				addCategory={addCategory}
			/>
		);
	});

	it("renders the category table with correct data", () => {
		const categoryRows = screen.getAllByRole("row");

		expect(categoryRows).toHaveLength(categories.length + 1); // +1 for the table header row

		categories.forEach((category, index) => {
			const categoryRow = categoryRows[index + 1]; // +1 to skip the table header row
			const categoryNameCell = screen.getByText(category.name);

			expect(categoryRow).toContainElement(categoryNameCell);
		});
	});

	it("calls deleteCategory function when delete button is clicked", () => {
		const deleteButtons = screen.getAllByRole("button", {
			name: "Delete Category",
		});

		deleteButtons.forEach((deleteButton, index) => {
			userEvent.click(deleteButton);

			const alertDialog = screen.getByRole("dialog");
			const confirmButton = screen.getByRole("button", { name: "Confirm" });

			expect(alertDialog).toBeInTheDocument();

			userEvent.click(confirmButton);

			expect(deleteCategory).toHaveBeenCalledWith(categories[index].id);
		});
	});

	it("calls addCategory function when add category form is submitted", () => {
		const addCategoryInput = screen.getByPlaceholderText("Add Category");
		const addButton = screen.getByRole("button", { name: "Add Category" });

		const newCategoryName = "New Category";

		fireEvent.change(addCategoryInput, { target: { value: newCategoryName } });
		fireEvent.click(addButton);

		expect(addCategory).toHaveBeenCalledWith(newCategoryName);
	});
});
