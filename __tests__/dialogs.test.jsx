import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileActionDialogs } from "../src/app/userprofile/dialogs";

describe("ProfileActionDialogs", () => {
	const userdata = {
		name: "John Doe",
		email: "john.doe@example.com",
		street: "123 Main St",
		houseNumber: "Apt 4",
		postalCode: "12345",
		placeOfResidence: "City",
	};

	const handleDelete = jest.fn();
	const handleEdit = jest.fn();
	jest.mock("react-dom", () => ({
		useFormState: jest.fn(),
	}));

	beforeEach(() => {
		render(
			<ProfileActionDialogs
				handleDelete={handleDelete}
				userdata={userdata}
				handleEdit={handleEdit}
			/>
		);
	});

	it("renders the edit profile dialog", () => {
		const editButton = screen.getByText("Profil Bearbeiten");
		fireEvent.click(editButton);

		const dialogTitle = screen.getByText("Profil Bearbeiten");
		expect(dialogTitle).toBeInTheDocument();

		const nameInput = screen.getByLabelText("Name");
		expect(nameInput).toBeInTheDocument();
		expect(nameInput.value).toBe(userdata.name);

		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toBeInTheDocument();
		expect(emailInput.value).toBe(userdata.email);

		const streetInput = screen.getByLabelText("Straße");
		expect(streetInput).toBeInTheDocument();
		expect(streetInput.value).toBe(userdata.street);

		const houseNumberInput = screen.getByLabelText("Nr.");
		expect(houseNumberInput).toBeInTheDocument();
		expect(houseNumberInput.value).toBe(userdata.houseNumber);

		const postalCodeInput = screen.getByLabelText("PLZ");
		expect(postalCodeInput).toBeInTheDocument();
		expect(postalCodeInput.value).toBe(userdata.postalCode);

		const placeOfResidenceInput = screen.getByLabelText("Stadt");
		expect(placeOfResidenceInput).toBeInTheDocument();
		expect(placeOfResidenceInput.value).toBe(userdata.placeOfResidence);
	});

	it("calls handleEdit when the form is submitted", () => {
		const editButton = screen.getByText("Profil Bearbeiten");
		fireEvent.click(editButton);

		const saveButton = screen.getByText("Speichern");
		fireEvent.click(saveButton);

		expect(handleEdit).toHaveBeenCalled();
	});

	it("renders the delete profile dialog", () => {
		const deleteButton = screen.getByText("Profil Löschen");
		fireEvent.click(deleteButton);

		const dialogTitle = screen.getByText("Bist du dir absolut sicher?");
		expect(dialogTitle).toBeInTheDocument();

		const dialogDescription = screen.getByText(
			"Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird dein Konto dauerhaft gelöscht und deine Daten von unseren Servern entfernt."
		);
		expect(dialogDescription).toBeInTheDocument();
	});

	it("calls handleDelete when the delete button is clicked", () => {
		const deleteButton = screen.getByText("Profil Löschen");
		fireEvent.click(deleteButton);

		const confirmButton = screen.getByText("Profil Löschen");
		fireEvent.click(confirmButton);

		expect(handleDelete).toHaveBeenCalled();
	});
});

import { ReservationsDialogs } from "../src/app/reservations/dialogs";

describe("ReservationsDialogs", () => {
	const reservation = {
		id: 1,
		tool: {
			id: 1,
		},
		endDate: "2022-12-31",
	};

	const updateReservations = jest.fn();
	const handleCancel = jest.fn();

	beforeEach(() => {
		render(
			<ReservationsDialogs
				reservation={reservation}
				updateReservations={updateReservations}
				handleCancel={handleCancel}
			/>
		);
	});

	it("renders the extend reservation dialog", () => {
		const extendButton = screen.getByText("Reservierung verlängern");
		fireEvent.click(extendButton);

		const dialogTitle = screen.getByText("Reservierung verlängern");
		expect(dialogTitle).toBeInTheDocument();

		const calendar = screen.getByRole("textbox", { name: "Calendar" });
		expect(calendar).toBeInTheDocument();

		const saveButton = screen.getByText("Speichern");
		expect(saveButton).toBeInTheDocument();
	});

	it("calls updateReservations when the form is submitted", () => {
		const extendButton = screen.getByText("Reservierung verlängern");
		fireEvent.click(extendButton);

		const saveButton = screen.getByText("Speichern");
		fireEvent.click(saveButton);

		expect(updateReservations).toHaveBeenCalled();
	});

	it("renders the cancel reservation dialog", () => {
		const cancelButton = screen.getByText("Reservierung stornieren");
		fireEvent.click(cancelButton);

		const dialogTitle = screen.getByText("Bist du dir absolut sicher?");
		expect(dialogTitle).toBeInTheDocument();

		const dialogDescription = screen.getByText(
			"Diese Aktion kann nicht rückgängig gemacht werden."
		);
		expect(dialogDescription).toBeInTheDocument();

		const cancelButtonInDialog = screen.getByText("Abbrechen");
		expect(cancelButtonInDialog).toBeInTheDocument();

		const confirmButton = screen.getByText("Reservierung stornieren");
		expect(confirmButton).toBeInTheDocument();
	});

	it("calls handleCancel when the cancel button is clicked", () => {
		const cancelButton = screen.getByText("Reservierung stornieren");
		fireEvent.click(cancelButton);

		const confirmButton = screen.getByText("Reservierung stornieren");
		fireEvent.click(confirmButton);

		expect(handleCancel).toHaveBeenCalledWith(reservation.id);
	});
});

import { ToolActionDialogs } from "../src/app/ownedtools/dialogs";

describe("ToolActionDialogs", () => {
	const tool = {
		id: 1,
		name: "Hammer",
		description: "A tool used for pounding nails",
	};

	const handleEdit = jest.fn();
	const handleDelete = jest.fn();
	const categories = ["Category 1", "Category 2", "Category 3"];

  beforeEach(() => {
    
    render(
      <ToolActionDialogs
        tool={tool}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        categories={categories}
      />
    );
	});

	it("renders the edit tool dialog", () => {
		const editButton = screen.getByText("Gerät Bearbeiten");
		fireEvent.click(editButton);

		const dialogTitle = screen.getByText("Gerät Bearbeiten");
		expect(dialogTitle).toBeInTheDocument();

		const nameInput = screen.getByLabelText("Name*");
		expect(nameInput).toBeInTheDocument();
		expect(nameInput.value).toBe(tool.name);

		const descriptionInput = screen.getByLabelText("Beschreibung*");
		expect(descriptionInput).toBeInTheDocument();
		expect(descriptionInput.value).toBe(tool.description);

		const categorySelector = screen.getByLabelText("Category Selector");
		expect(categorySelector).toBeInTheDocument();

		const photoUploader = screen.getByLabelText("Photo Uploader");
		expect(photoUploader).toBeInTheDocument();
	});

	it("calls handleEdit when the form is submitted", () => {
		const editButton = screen.getByText("Gerät Bearbeiten");
		fireEvent.click(editButton);

		const saveButton = screen.getByText("Speichern");
		fireEvent.click(saveButton);

		expect(handleEdit).toHaveBeenCalled();
	});

	it("renders the delete tool dialog", () => {
		const deleteButton = screen.getByText("Gerät Löschen");
		fireEvent.click(deleteButton);

		const dialogTitle = screen.getByText("Bist du dir absolut sicher?");
		expect(dialogTitle).toBeInTheDocument();

		const dialogDescription = screen.getByText(
			"Diese Aktion kann nicht rückgängig gemacht werden."
		);
		expect(dialogDescription).toBeInTheDocument();
	});

	it("calls handleDelete when the delete button is clicked", () => {
		const deleteButton = screen.getByText("Gerät Löschen");
		fireEvent.click(deleteButton);

		const confirmButton = screen.getByText("Gerät Löschen");
		fireEvent.click(confirmButton);

		expect(handleDelete).toHaveBeenCalledWith(tool.id);
	});
});
