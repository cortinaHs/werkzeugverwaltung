import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import toolregistrationPage from "./page";

jest.mock("../auth");
jest.mock("../../lib/prisma");
jest.mock("next/navigation");

describe("toolregistrationPage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect to /signin if user is not authenticated", async () => {
		auth.mockResolvedValueOnce(null);

		toolregistrationPage();

		await waitFor(() => {
			expect(redirect).toHaveBeenCalledWith("/signin");
		});
	});

	it("should render the tool registration form if user is authenticated", async () => {
		const session = { user: { id: 1 } };
		auth.mockResolvedValueOnce(session);
		prisma.category.findMany.mockResolvedValueOnce([]);

		render(toolregistrationPage());

		await waitFor(() => {
			expect(screen.getByText("Gerät registrieren")).toBeInTheDocument();
			expect(screen.getByLabelText("Name")).toBeInTheDocument();
			expect(screen.getByLabelText("Category")).toBeInTheDocument();
			expect(screen.getByLabelText("Description")).toBeInTheDocument();
			expect(screen.getByLabelText("File Upload")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Submit" })
			).toBeInTheDocument();
		});
	});

	it("should register a tool when the form is submitted with valid data", async () => {
		const session = { user: { id: 1 } };
		auth.mockResolvedValueOnce(session);
		prisma.category.findMany.mockResolvedValueOnce([]);
		prisma.tool.create.mockResolvedValueOnce({ id: 1 });

		render(toolregistrationPage());

		const nameInput = screen.getByLabelText("Name");
		const categoryInput = screen.getByLabelText("Category");
		const descriptionInput = screen.getByLabelText("Description");
		const fileInput = screen.getByLabelText("File Upload");
		const submitButton = screen.getByRole("button", { name: "Submit" });

		userEvent.type(nameInput, "Tool Name");
		userEvent.selectOptions(categoryInput, "1");
		userEvent.type(descriptionInput, "Tool Description");
		userEvent.upload(
			fileInput,
			new File(["file contents"], "test.jpg", { type: "image/jpeg" })
		);
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(prisma.tool.create).toHaveBeenCalledWith({
				data: {
					name: "Tool Name",
					description: "Tool Description",
					photo: "ZmlsZSBjb250ZW50cw==",
					imgtype: "image/jpeg",
					categoryId: 1,
					ownerId: 1,
				},
			});
		});
	});
});
