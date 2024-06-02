const { PrismaClient } = require("@prisma/client");

export const prisma =  new PrismaClient({
	errorFormat: "pretty",
	log: ["info"],
});
