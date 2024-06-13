import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Home", () => {
	it("renders welcome message", async () => {
		render(<Home />);
		const welcomeMessage = screen.getByText(/Willkommen bei Neighbortool/i);
		expect(welcomeMessage).toBeInTheDocument();
	});

	it("renders device images", async () => {
		render(<Home />);
		const deviceImages = screen.getAllByAltText(/Bild \d/i);
		expect(deviceImages).toHaveLength(3);
	});
});

import userEvent from "@testing-library/user-event";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import toolregistrationPage from "../src/app/page";

jest.mock("../../lib/prisma", () => ({
  prisma: {
    tool: {
      create: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("registertool", () => {
  it("registers a tool successfully", async () => {
    const formState = {};
    const formData = new FormData();
    formData.append("name", "Tool Name");
    formData.append("categoryId", "1");
    formData.append("description", "Tool Description");
    formData.append("file-upload", new File([""], "test.jpg", { type: "image/jpeg" }));

    await toolregistrationPage().registertool(formState, formData);

    expect(prisma.tool.create).toHaveBeenCalledWith({
      data: {
        name: "Tool Name",
        description: "Tool Description",
        photo: expect.any(String),
        imgtype: "image/jpeg",
        categoryId: 1,
        ownerId: expect.any(String),
      },
    });
    expect(redirect).toHaveBeenCalledWith("/ownedtools");
  });

  it("returns errors for invalid form fields", async () => {
    const formState = {};
    const formData = new FormData();
    formData.append("name", "");
    formData.append("categoryId", "1");
    formData.append("description", "Tool Description");

    const result = await toolregistrationPage().registertool(formState, formData);

    expect(result).toEqual({
      errors: {
        name: expect.any(String),
      },
    });
    expect(prisma.tool.create).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});


import { auth } from "../auth";
import SearchPage from "../src/app/page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../auth", () => ({
  auth: jest.fn(),
}));

jest.mock("../../lib/prisma", () => ({
  prisma: {
    favorite: {
      findMany: jest.fn(),
    },
    category: {
      findMany: jest.fn(),
    },
    tool: {
      findMany: jest.fn(),
    },
  },
}));

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to signin page if user is not authenticated", async () => {
    auth.mockResolvedValueOnce(null);

    render(<SearchPage searchParams={{}} />);

    expect(redirect).toHaveBeenCalledWith("/signin");
  });

  it("renders search filter component with correct props", async () => {
    const session = { user: { id: "user-id" } };
    const favoritesObj = [{ toolId: "tool-id" }];
    const categories = [{ name: "category-1" }, { name: "category-2" }];
    const tools = [{ name: "tool-1" }, { name: "tool-2" }];

    auth.mockResolvedValueOnce(session);
    prisma.favorite.findMany.mockResolvedValueOnce(favoritesObj);
    prisma.category.findMany.mockResolvedValueOnce(categories);
    prisma.tool.findMany.mockResolvedValueOnce(tools);

    render(<SearchPage searchParams={{}} />);

    expect(screen.getByText("SearchFilter")).toBeInTheDocument();
    expect(screen.getByText("SearchFilter")).toHaveAttribute("categories", JSON.stringify(categories));
    expect(screen.getByText("SearchFilter")).toHaveAttribute("tools", JSON.stringify(tools));
    expect(screen.getByText("SearchFilter")).toHaveAttribute("favorites", JSON.stringify(["tool-id"]));
  });

  it("redirects to tool registration page", async () => {
    const session = { user: { id: "user-id" } };

    auth.mockResolvedValueOnce(session);

    render(<SearchPage searchParams={{}} />);

    userEvent.click(screen.getByText("Redirect to Tool Registration"));

    expect(redirect).toHaveBeenCalledWith("/toolregistration");
  });
});



import { signOut } from "next-auth/react";
import UserProfilePage from "../src/app/userprofile/page";

jest.mock("../auth", () => ({
  auth: jest.fn(),
}));

jest.mock("../../lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    reservation: {
      deleteMany: jest.fn(),
    },
    favorite: {
      deleteMany: jest.fn(),
    },
    tool: {
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("UserProfilePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to signin page if user is not authenticated", async () => {
    auth.mockResolvedValueOnce(null);

    render(<UserProfilePage />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/signin");
    });
  });

  it("renders user profile information", async () => {
    const session = { user: { id: "user-id" } };
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      street: "123 Main St",
      houseNumber: "Apt 4",
      postalCode: "12345",
      placeOfResidence: "City",
    };

    auth.mockResolvedValueOnce(session);
    prisma.user.findUnique.mockResolvedValueOnce(userData);

    render(<UserProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Profilinformationen")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("E-Mail Adresse")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("Adresse")).toBeInTheDocument();
      expect(screen.getByText("123 Main St Apt 4, 12345 City")).toBeInTheDocument();
    });
  });

  it("deletes user and redirects to home page", async () => {
    const session = { user: { id: "user-id" } };

    auth.mockResolvedValueOnce(session);
    prisma.user.delete.mockResolvedValueOnce();
    prisma.reservation.deleteMany.mockResolvedValueOnce();
    prisma.favorite.deleteMany.mockResolvedValueOnce();
    prisma.tool.deleteMany.mockResolvedValueOnce();
    signOut.mockResolvedValueOnce();
    redirect.mockResolvedValueOnce();

    render(<UserProfilePage />);
    userEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(prisma.reservation.deleteMany).toHaveBeenCalledWith({
        where: {
          userId: "user-id",
        },
      });
      expect(prisma.favorite.deleteMany).toHaveBeenCalledWith({
        where: {
          userId: "user-id",
        },
      });
      expect(prisma.tool.deleteMany).toHaveBeenCalledWith({
        where: {
          ownerId: "user-id",
        },
      });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: {
          id: "user-id",
        },
      });
      expect(signOut).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith("/");
    });
  });

  it("edits user profile information", async () => {
    const session = { user: { id: "user-id" } };
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      street: "123 Main St",
      houseNumber: "Apt 4",
      postalCode: "12345",
      placeOfResidence: "City",
    };
    const updatedName = "Jane Smith";
    const updatedEmail = "jane.smith@example.com";
    const updatedStreet = "456 Elm St";
    const updatedHouseNumber = "Apt 2";
    const updatedPostalCode = "54321";
    const updatedPlaceOfResidence = "Town";

    auth.mockResolvedValueOnce(session);
    prisma.user.findUnique.mockResolvedValueOnce(userData);
    prisma.user.update.mockResolvedValueOnce();
    redirect.mockResolvedValueOnce();

    render(<UserProfilePage />);
    userEvent.type(screen.getByLabelText("Name"), updatedName);
    userEvent.type(screen.getByLabelText("E-Mail Adresse"), updatedEmail);
    userEvent.type(screen.getByLabelText("Straße"), updatedStreet);
    userEvent.type(screen.getByLabelText("Hausnummer"), updatedHouseNumber);
    userEvent.type(screen.getByLabelText("Postleitzahl"), updatedPostalCode);
    userEvent.type(screen.getByLabelText("Wohnort"), updatedPlaceOfResidence);
    userEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: "user-id",
        },
        data: {
          name: updatedName,
          email: updatedEmail,
          street: updatedStreet,
          houseNumber: updatedHouseNumber,
          postalCode: updatedPostalCode,
          placeOfResidence: updatedPlaceOfResidence,
        },
      });
      expect(redirect).toHaveBeenCalledWith("/userprofile");
    });
  });
});


import ReservationsPage from "../src/app/reservations/page";

jest.mock("../../lib/prisma", () => ({
  prisma: {
    reservation: {
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("ReservationsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates reservations successfully", async () => {
    const session = { user: { id: "user-id" } };
    const reservationId = 1;
    const toolId = 2;
    const dateTo = new Date();
    const endDate = new Date();

    const reservationCheck = null;

    prisma.reservation.findFirst.mockResolvedValueOnce(reservationCheck);
    prisma.reservation.update.mockResolvedValueOnce();

    render(<ReservationsPage />);

    userEvent.type(screen.getByLabelText("Reservation ID"), reservationId.toString());
    userEvent.type(screen.getByLabelText("Tool ID"), toolId.toString());
    userEvent.type(screen.getByLabelText("Date To"), dateTo.toString());
    userEvent.type(screen.getByLabelText("End Date"), endDate.toString());
    userEvent.click(screen.getByText("Update Reservations"));

    await waitFor(() => {
      expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
        where: {
          toolId: toolId,
          OR: [
            {
              AND: [
                {
                  startDate: { gt: endDate },
                },
                { startDate: { lte: dateTo } },
              ],
            },
            {
              AND: [{ endDate: { gt: endDate } }, { endDate: { lte: dateTo } }],
            },
          ],
        },
      });
      expect(prisma.reservation.update).toHaveBeenCalledWith({
        where: {
          id: reservationId,
        },
        data: {
          endDate: dateTo,
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/reservations", "reservations");
    });
  });

  it("returns error for overlapping reservations", async () => {
    const session = { user: { id: "user-id" } };
    const reservationId = 1;
    const toolId = 2;
    const dateTo = new Date();
    const endDate = new Date();

    const reservationCheck = { id: 3 };

    prisma.reservation.findFirst.mockResolvedValueOnce(reservationCheck);

    render(<ReservationsPage />);

    userEvent.type(screen.getByLabelText("Reservation ID"), reservationId.toString());
    userEvent.type(screen.getByLabelText("Tool ID"), toolId.toString());
    userEvent.type(screen.getByLabelText("Date To"), dateTo.toString());
    userEvent.type(screen.getByLabelText("End Date"), endDate.toString());
    userEvent.click(screen.getByText("Update Reservations"));

    await waitFor(() => {
      expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
        where: {
          toolId: toolId,
          OR: [
            {
              AND: [
                {
                  startDate: { gt: endDate },
                },
                { startDate: { lte: dateTo } },
              ],
            },
            {
              AND: [{ endDate: { gt: endDate } }, { endDate: { lte: dateTo } }],
            },
          ],
        },
      });
      expect(prisma.reservation.update).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
      expect(result).toEqual({
        error: "Dieses Werkzeug ist in diesem Zeitraum bereits reserviert.",
      });
    });
  });
});

import OwnedTools from "../src/app/ownedtools/page";

jest.mock("../auth", () => ({
  auth: jest.fn(),
}));

jest.mock("../../lib/prisma", () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
    },
    tool: {
      findMany: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("ReservationsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to signin page if user is not authenticated", async () => {
    auth.mockResolvedValueOnce(null);

    render(<ReservationsPage />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/signin");
    });
  });

  it("renders owned tools", async () => {
    const session = { user: { id: "user-id" } };
    const categories = [{ name: "category-1" }, { name: "category-2" }];
    const tools = [
      {
        id: 1,
        name: "tool-1",
        photo: "photo-1",
        imgtype: "image/jpeg",
        category: { name: "category-1" },
        description: "description-1",
      },
      {
        id: 2,
        name: "tool-2",
        photo: "photo-2",
        imgtype: "image/png",
        category: { name: "category-2" },
        description: "description-2",
      },
    ];

    auth.mockResolvedValueOnce(session);
    prisma.category.findMany.mockResolvedValueOnce(categories);
    prisma.tool.findMany.mockResolvedValueOnce(tools);

    render(<OwnedTools />);

    await waitFor(() => {
      expect(screen.getByText("Eigene Geräte")).toBeInTheDocument();
      expect(screen.getByText("tool-1")).toBeInTheDocument();
      expect(screen.getByText("tool-2")).toBeInTheDocument();
    });
  });

  it("deletes a tool successfully", async () => {
    const session = { user: { id: "user-id" } };
    const toolId = 1;

    auth.mockResolvedValueOnce(session);
    prisma.tool.delete.mockResolvedValueOnce();

    render(<OwnedTools />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Delete"));
      expect(prisma.tool.delete).toHaveBeenCalledWith({
        where: { id: toolId },
      });
      expect(redirect).toHaveBeenCalledWith("/ownedtools");
    });
  });

  it("edits a tool successfully", async () => {
    const session = { user: { id: "user-id" } };
    const toolId = 1;
    const formData = new FormData();
    formData.append("id", toolId.toString());
    formData.append("name", "updated-tool");
    formData.append("categoryId", "2");
    formData.append("description", "updated-description");
    formData.append("file-upload", new File([""], "test.jpg", { type: "image/jpeg" }));

    const validatedFields = {
      success: true,
      data: {
        name: "updated-tool",
        category: "2",
        description: "updated-description",
      },
    };

    auth.mockResolvedValueOnce(session);
    prisma.tool.update.mockResolvedValueOnce();
    prisma.category.findMany.mockResolvedValueOnce([{ name: "category-1" }, { name: "category-2" }]);
    prisma.tool.findMany.mockResolvedValueOnce([]);

    render(<OwnedTools />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Edit"));
      expect(prisma.tool.update).toHaveBeenCalledWith({
        where: { id: toolId },
        data: {
          name: "updated-tool",
          description: "updated-description",
          photo: expect.any(String),
          imgtype: "image/jpeg",
          categoryId: 2,
        },
      });
      expect(redirect).toHaveBeenCalledWith("/ownedtools");
    });
  });

  it("redirects to tool registration page", async () => {
    const session = { user: { id: "user-id" } };

    auth.mockResolvedValueOnce(session);

    render(<OwnedTools />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Gerät hinzufügen"));
      expect(redirect).toHaveBeenCalledWith("/toolregistration");
    });
  });
});

import Admin from "../src/app/admin/page";

jest.mock("../auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
    },
    tool: {
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Admin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to signin page if user is not authenticated", async () => {
    auth.mockResolvedValueOnce(null);

    render(<Admin />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/signin");
    });
  });

  it("redirects to search page if user is not an admin", async () => {
    const session = { user: { role: "user" } };

    auth.mockResolvedValueOnce(session);

    render(<Admin />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/search");
    });
  });

  it("renders admin page with categories and users", async () => {
    const session = { user: { role: "admin" } };
    const categories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];
    const users = [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }];

    auth.mockResolvedValueOnce(session);
    prisma.category.findMany.mockResolvedValueOnce(categories);
    prisma.user.findMany.mockResolvedValueOnce(users);

    render(<Admin />);

    await waitFor(() => {
      expect(screen.getByText("Adminbereich")).toBeInTheDocument();
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
      expect(screen.getByText("User 1")).toBeInTheDocument();
      expect(screen.getByText("User 2")).toBeInTheDocument();
    });
  });

  it("deletes a category successfully", async () => {
    const session = { user: { role: "admin" } };
    const categories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];

    auth.mockResolvedValueOnce(session);
    prisma.category.findMany.mockResolvedValueOnce(categories);
    prisma.tool.deleteMany.mockResolvedValueOnce();
    prisma.category.delete.mockResolvedValueOnce();
    prisma.$transaction.mockResolvedValueOnce();
    redirect.mockResolvedValueOnce();

    render(<Admin />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Delete Category 1"));
      expect(prisma.tool.deleteMany).toHaveBeenCalledWith({
        where: { categoryId: 1 },
      });
      expect(prisma.category.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.$transaction).toHaveBeenCalledWith([
        expect.any(Promise),
        expect.any(Promise),
      ]);
      expect(redirect).toHaveBeenCalledWith("/admin");
    });
  });

  it("adds a category successfully", async () => {
    const session = { user: { role: "admin" } };
    const categories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];
    const formState = {};
    const formData = new FormData();
    formData.append("category", "New Category");

    auth.mockResolvedValueOnce(session);
    prisma.category.findMany.mockResolvedValueOnce(categories);
    prisma.category.create.mockResolvedValueOnce();
    redirect.mockResolvedValueOnce();

    render(<Admin />);

    await waitFor(() => {
      userEvent.type(screen.getByLabelText("Category"), "New Category");
      userEvent.click(screen.getByText("Add Category"));
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: {
          name: "New Category",
        },
      });
      expect(redirect).toHaveBeenCalledWith("/admin");
    });
  });

  it("returns an error when adding a category with an empty name", async () => {
    const session = { user: { role: "admin" } };
    const categories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];
    const formState = {};
    const formData = new FormData();
    formData.append("category", "");

    auth.mockResolvedValueOnce(session);
    prisma.category.findMany.mockResolvedValueOnce(categories);

    render(<Admin />);

    await waitFor(() => {
      userEvent.click(screen.getByText("Add Category"));
      expect(prisma.category.create).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
      expect(screen.getByText("Kategorie kann nicht leer sein.")).toBeInTheDocument();
    });
  });
});

import SignupPage from "../src/app/auth/signup/page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../src/app/auth", () => ({
  auth: jest.fn(),
}));

describe("SignupPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to home page if user is already authenticated", async () => {
    auth.mockResolvedValueOnce({ user: {} });

    render(<SignupPage />);

    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("renders signup form", async () => {
    auth.mockResolvedValueOnce({});

    render(<SignupPage />);

    expect(screen.getByText("Registrierung")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    expect(screen.getByLabelText("Passwort bestätigen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrieren" })).toBeInTheDocument();
  });

  it("redirects to signin page when 'Hier anmelden' link is clicked", async () => {
    auth.mockResolvedValueOnce({});

    render(<SignupPage />);

    userEvent.click(screen.getByText("Hier anmelden."));

    expect(redirect).toHaveBeenCalledWith("/signin");
  });
});

import SignInPage from "../src/app/auth/signin/page";

jest.mock("@/app/auth.js", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation.js", () => ({
  redirect: jest.fn(),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to home page if user is already authenticated", async () => {
    auth.mockResolvedValueOnce({ user: { id: "user-id" } });

    render(<SignInPage />);

    expect(auth).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("renders the sign-in form", async () => {
    auth.mockResolvedValueOnce({});

    render(<SignInPage />);

    expect(screen.getByText("Anmeldung")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anmelden" })).toBeInTheDocument();
  });

  it("redirects to the sign-up page when 'Hier kostenlos registrieren' link is clicked", async () => {
    auth.mockResolvedValueOnce({});

    render(<SignInPage />);

    userEvent.click(screen.getByText("Hier kostenlos registrieren."));

    expect(redirect).toHaveBeenCalledWith("/signup");
  });
});