
const nextJest = require("next/jest");
/** @type {import('jest').Config} */


const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/singleton.js"],
	moduleNameMapper: {
		// ...
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"@/auth": "<rootDir>/__tests__/mocks/auth.js",
		"next-auth/providers/credentials":
			"<rootDir>/__tests__/mocks/next-auth-providers-credentials.js",
		"next-auth": "<rootDir>/__tests__/mocks/next-auth.js",
	},
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
