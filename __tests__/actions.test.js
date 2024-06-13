const { updateReservations } = require("../src/app/search/actions");
import { useFormState } from "react-dom";

describe("updateReservations", () => {
	it("should create a reservation if the tool is available", async () => {
		// Mock the dependencies
		const auth = jest.fn().mockResolvedValue({ user: { id: 1 } });
		const prisma = {
			reservation: {
				findFirst: jest.fn().mockResolvedValue(null),
				create: jest.fn().mockResolvedValue({}),
			},
		};

		jest.mock("react-dom", () => ({
			useFormState: jest.fn(),
		}));

		// Mock the form data
		const formData = new FormData();
		formData.append("dateFrom", "2022-01-01");
		formData.append("dateTo", "2022-01-02");
		formData.append("toolId", "1");

		// Call the function
		const result = await updateReservations(null, formData);

		// Assertions
		expect(auth).toHaveBeenCalled();
		expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
			where: {
				toolId: 1,
				OR: [
					{
						AND: [
							{ startDate: { gte: new Date("2022-01-01") } },
							{ startDate: { lte: new Date("2022-01-02") } },
						],
					},
					{
						AND: [
							{ endDate: { gte: new Date("2022-01-01") } },
							{ endDate: { lte: new Date("2022-01-02") } },
						],
					},
				],
			},
		});
		expect(prisma.reservation.create).toHaveBeenCalledWith({
			data: {
				userId: 1,
				toolId: 1,
				startDate: new Date("2022-01-01"),
				endDate: new Date("2022-01-02"),
			},
		});
		expect(result).toEqual({ success: "Werkzeug erfolgreich reserviert." });
	});

	it("should return an error if the tool is already reserved", async () => {
		// Mock the dependencies
		const auth = jest.fn().mockResolvedValue({ user: { id: 1 } });
		const prisma = {
			reservation: {
				findFirst: jest.fn().mockResolvedValue({}),
			},
		};

		jest.mock("react-dom", () => ({
			useFormState: jest.fn(),
		}));

		// Mock the form data
		const formData = new FormData();
		formData.append("dateFrom", "2022-01-01");
		formData.append("dateTo", "2022-01-02");
		formData.append("toolId", "1");

		// Call the function
		const result = await updateReservations(null, formData);

		// Assertions
		expect(auth).toHaveBeenCalled();
		expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
			where: {
				toolId: 1,
				OR: [
					{
						AND: [
							{ startDate: { gte: new Date("2022-01-01") } },
							{ startDate: { lte: new Date("2022-01-02") } },
						],
					},
					{
						AND: [
							{ endDate: { gte: new Date("2022-01-01") } },
							{ endDate: { lte: new Date("2022-01-02") } },
						],
					},
				],
			},
		});
		expect(result).toEqual({
			error: "Dieses Werkzeug ist in diesem Zeitraum bereits reserviert.",
		});
	});
});
const { signUp } = require("../src/app/auth/signup/actions");

jest.mock("react-dom", () => ({
	useFormState: jest.fn(),
}));

describe("signUp", () => {
	it("should create a new user and sign them in", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("name", "John Doe");
		formData.append("email", "johndoe@example.com");
		formData.append("password", "password123");

		// Mock the dependencies
		const bcrypt = require("bcrypt");
		const prisma = {
			user: {
				create: jest.fn().mockResolvedValue({}),
			},
		};
		const signIn = jest.fn();

		// Call the function
		const result = await signUp(null, formData);

		// Assertions
		expect(prisma.user.create).toHaveBeenCalledWith({
			data: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: expect.any(String),
			},
		});
		expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
		expect(signIn).toHaveBeenCalledWith("credentials", {
			email: "johndoe@example.com",
			password: "password123",
			redirectTo: "/",
		});
		expect(result).toBeUndefined();
	});

	it("should return errors if form fields are invalid", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("name", "");
		formData.append("email", "invalidemail");
		formData.append("password", "short");

		// Call the function
		const result = await signUp(null, formData);

		// Assertions
		expect(result).toEqual({
			errors: {
				name: ["This field is required"],
				email: ["Invalid email address"],
				password: ["Password must be at least 6 characters long"],
			},
		});
	});

	it("should return errors if email is already taken", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("name", "John Doe");
		formData.append("email", "johndoe@example.com");
		formData.append("password", "password123");

		// Mock the dependencies
		const bcrypt = require("bcrypt");
		const prisma = {
			user: {
				create: jest.fn().mockRejectedValue({
					code: "P2002",
				}),
			},
		};

		// Call the function
		const result = await signUp(null, formData);

		// Assertions
		expect(prisma.user.create).toHaveBeenCalledWith({
			data: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: expect.any(String),
			},
		});
		expect(result).toEqual({
			errors: "Es gibt bereits einen Account mit dieser Email.",
		});
	});
});
const { signIn } = require("@/app/auth");
const { AuthError } = require("next-auth");
const { authenticate } = require("../src/app/auth/signin/actions");

describe("authenticate", () => {
	it("should sign in the user with valid credentials", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");

		// Mock the signIn function
		const signInMock = jest.spyOn(signIn, "signIn");

		// Call the function
		await authenticate(null, formData);

		// Assertions
		expect(signInMock).toHaveBeenCalledWith("credentials", {
			email: "test@example.com",
			password: "password123",
			redirectTo: "/search",
		});
	});

	it("should return an error message for invalid credentials", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "invalidpassword");

		// Mock the signIn function to throw an AuthError
		const signInMock = jest
			.spyOn(signIn, "signIn")
			.mockRejectedValue(new AuthError("CredentialsSignin"));

		// Call the function
		const result = await authenticate(null, formData);

		// Assertions
		expect(signInMock).toHaveBeenCalledWith("credentials", {
			email: "test@example.com",
			password: "invalidpassword",
			redirectTo: "/search",
		});
		expect(result).toEqual("Bitte überprüfe deine Anmeldedaten.");
	});

	it("should throw an error for other types of AuthError", async () => {
		// Mock the form data
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");

		// Mock the signIn function to throw a different type of AuthError
		const signInMock = jest
			.spyOn(signIn, "signIn")
			.mockRejectedValue(new AuthError("SomeOtherError"));

		// Call the function and expect it to throw an error
		await expect(authenticate(null, formData)).rejects.toThrow(AuthError);
	});
});
