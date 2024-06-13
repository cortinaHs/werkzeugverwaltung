export class AuthError extends Error {
	
	constructor(type) {
		super(type);
		this.type = type;
	}
}

const NextAuth = () => ({
	auth: jest.fn(),
	signIn: jest.fn(),
	signOut: jest.fn(),
	handlers: {
		GET: jest.fn(),
		POST: jest.fn(),
	},
	AuthError: AuthError,
});

export default NextAuth;
