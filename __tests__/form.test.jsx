import { render, screen, fireEvent } from "@testing-library/react";
import { ToolregistrationForm } from "../src/app/toolregistration/form";

describe("ToolregistrationForm", () => {
	const handleForm = jest.fn();
	const categories = [
		{ id: 1, name: "Category 1" },
		{ id: 2, name: "Category 2" },
	];

	beforeEach(() => {
		render(
			<ToolregistrationForm handleForm={handleForm} categories={categories} />
		);
	});

	it("renders the form component", () => {
		expect(screen.getByRole("form")).toBeInTheDocument();
	});

	it("renders the name input field", () => {
		expect(screen.getByLabelText("Name des Geräts*")).toBeInTheDocument();
	});

	it("renders the description textarea", () => {
		expect(screen.getByLabelText("Beschreibung*")).toBeInTheDocument();
	});

	it("renders the category selector", () => {
		expect(screen.getByLabelText("CategorySelector")).toBeInTheDocument();
	});

	it("renders the photo uploader", () => {
		expect(screen.getByLabelText("PhotoUploader")).toBeInTheDocument();
	});

	it("calls the handleForm function when the form is submitted", () => {
		fireEvent.submit(screen.getByRole("form"));
		expect(handleForm).toHaveBeenCalled();
	});
});
it("calls the handleForm function with the form data when the form is submitted", () => {
  const formData = {
    name: "Test Tool",
    description: "This is a test tool",
    category: "Category 1",
    photo: "test.jpg",
  };

  fireEvent.change(screen.getByLabelText("Name des Geräts*"), {
    target: { value: formData.name },
  });
  fireEvent.change(screen.getByLabelText("Beschreibung*"), {
    target: { value: formData.description },
  });
  fireEvent.change(screen.getByLabelText("CategorySelector"), {
    target: { value: formData.category },
  });
  fireEvent.change(screen.getByLabelText("PhotoUploader"), {
    target: { value: formData.photo },
  });

  fireEvent.submit(screen.getByRole("form"));

  expect(handleForm).toHaveBeenCalledWith(formData);
});

it("displays an error message when the name input is empty", () => {
  fireEvent.change(screen.getByLabelText("Name des Geräts*"), {
    target: { value: "" },
  });

  fireEvent.submit(screen.getByRole("form"));

  expect(screen.getByText("Bitte gib den Namen des Geräts ein.")).toBeInTheDocument();
});

it("displays an error message when the description textarea is empty", () => {
  fireEvent.change(screen.getByLabelText("Beschreibung*"), {
    target: { value: "" },
  });

  fireEvent.submit(screen.getByRole("form"));

  expect(screen.getByText("Bitte gib eine Beschreibung ein.")).toBeInTheDocument();
});

import { SignupForm } from "../src/app/(auth)/signup/form";

describe("SignupForm", () => {
  it("renders the form component", () => {
    render(<SignupForm />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders the name input field", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText("Email Adresse")).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
  });

  it("calls the formAction function when the form is submitted", () => {
    const formAction = jest.fn();
    render(<SignupForm formAction={formAction} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(formAction).toHaveBeenCalled();
  });

  it("displays an error message when the name input is empty", () => {
    render(<SignupForm />);
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText("Bitte gib deinen Namen ein.")).toBeInTheDocument();
  });

  it("displays an error message when the email input is empty", () => {
    render(<SignupForm />);
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText("Bitte gib deine Email Adresse ein.")).toBeInTheDocument();
  });

  it("displays an error message when the password input is empty", () => {
    render(<SignupForm />);
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByText("Bitte gib dein Passwort ein.")).toBeInTheDocument();
  });
});

import SignInForm from "../src/app/(auth)/signin/form";

describe("SignInForm", () => {
  it("renders the form component", () => {
    render(<SignInForm />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    render(<SignInForm />);
    expect(screen.getByLabelText("Email Adresse")).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    render(<SignInForm />);
    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
  });

  it("calls the authenticate function when the form is submitted", () => {
    const authenticate = jest.fn();
    render(<SignInForm authenticate={authenticate} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(authenticate).toHaveBeenCalled();
  });

  it("displays an error message when the form state is not undefined", () => {
    const formState = "Invalid credentials";
    render(<SignInForm formState={formState} />);
    expect(screen.getByText(formState)).toBeInTheDocument();
  });
});